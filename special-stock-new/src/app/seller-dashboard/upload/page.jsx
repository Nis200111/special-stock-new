"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Upload,
    Image as ImageIcon,
    CheckCircle,
    XCircle,
    DollarSign,
    Video,
} from "lucide-react";

import SellerSidebar from "@/components/seller/SellerSidebar";

const SellerUploadPage = () => {
    const router = useRouter();

    //  for sidebar
    const [userData, setUserData] = useState(null);

    const [isUploading, setIsUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "photography",
        tags: "",
        price: "",
        contentType: "image", // 'image' or 'video'
        file: null,
    });

    //  auth check for seller pages (same logic as dashboard)
    useEffect(() => {
        try {
            const token = localStorage.getItem("token");
            const role = localStorage.getItem("userRole");
            const user = JSON.parse(localStorage.getItem("user") || "{}");

            if (!token) {
                router.push("/login");
                return;
            }

            if (role !== "seller") {
                router.push("/seller");
                return;
            }

            setUserData(user);
        } catch (e) {
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("user");
        localStorage.removeItem("userName");

        document.cookie = "token=; path=/; max-age=0";
        document.cookie = "userRole=; path=/; max-age=0";

        router.push("/login");
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type based on content type
        if (formData.contentType === "image") {
            if (!file.type.startsWith("image/")) {
                setError("Please select an image file");
                return;
            }
        } else if (formData.contentType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Please select a video file");
                return;
            }
        }

        // Validate file size (max 50MB for video, 10MB for image)
        const maxSize = formData.contentType === "video" ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
        if (file.size > maxSize) {
            setError(`File size must be less than ${formData.contentType === "video" ? "50MB" : "10MB"}`);
            return;
        }

        setFormData({ ...formData, file });

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);

        setError("");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!formData.file) {
            setError(`Please select a ${formData.contentType} to upload`);
            return;
        }

        if (!formData.title || !formData.price) {
            setError("Title and price are required");
            return;
        }

        setIsUploading(true);

        try {
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user") || "{}");

            const uploadData = new FormData();
            uploadData.append("media", formData.file);
            uploadData.append("title", formData.title);
            uploadData.append("description", formData.description);
            uploadData.append("category", formData.category);
            uploadData.append("tags", formData.tags);
            uploadData.append("price", formData.price);
            uploadData.append("contentType", formData.contentType);
            uploadData.append("sellerId", user.id);

            const response = await fetch("http://localhost:5000/api/seller/upload-image", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: uploadData,
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Upload failed");

            setSuccess(true);
            setFormData({
                title: "",
                description: "",
                category: "photography",
                tags: "",
                price: "",
                contentType: "image",
                file: null,
            });
            setPreview(null);

            setTimeout(() => router.push("/seller-dashboard"), 2000);
        } catch (err) {
            console.error("Upload error:", err);
            setError(err.message || "Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/*  Re-usable Sidebar */}
            <SellerSidebar userData={userData} onLogout={handleLogout} />

            {/*  IMPORTANT: main area needs left margin because sidebar is fixed */}
            <div className="ml-64">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">My Uploads</h1>
                                <p className="text-sm text-gray-500">View and manage your uploaded images</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-6 py-12">
                    {/* Success Message */}
                    {success && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center gap-4 mb-6">
                            <CheckCircle size={24} className="text-green-600" />
                            <div>
                                <h3 className="text-green-900 font-bold">Content Uploaded Successfully!</h3>
                                <p className="text-green-700 text-sm">Redirecting to dashboard...</p>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-center gap-4 mb-6">
                            <XCircle size={24} className="text-red-600" />
                            <div>
                                <h3 className="text-red-900 font-bold">Error</h3>
                                <p className="text-red-700 text-sm">{error}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Upload Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900">Upload Your Content</h2>

                                <div className="flex p-1 bg-gray-100 rounded-lg">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({ ...formData, contentType: "image", file: null });
                                            setPreview(null);
                                            setError("");
                                        }}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${formData.contentType === "image"
                                            ? "bg-white text-gray-900 shadow-sm"
                                            : "text-gray-500 hover:text-gray-700"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <ImageIcon size={16} />
                                            Image
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFormData({ ...formData, contentType: "video", file: null });
                                            setPreview(null);
                                            setError("");
                                        }}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${formData.contentType === "video"
                                            ? "bg-white text-gray-900 shadow-sm"
                                            : "text-gray-500 hover:text-gray-700"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Video size={16} />
                                            Video
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-bold text-gray-900 mb-3">
                                    Select {formData.contentType === "image" ? "Image" : "Video"} *
                                </label>

                                {!preview ? (
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors">
                                        <input
                                            type="file"
                                            accept={formData.contentType === "image" ? "image/*" : "video/mp4,video/quicktime,video/*"}
                                            onChange={handleFileChange}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            {formData.contentType === "image" ? (
                                                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                                            ) : (
                                                <Video size={48} className="mx-auto text-gray-400 mb-4" />
                                            )}
                                            <p className="text-gray-600 font-medium mb-2">Click to upload or drag and drop</p>
                                            <p className="text-sm text-gray-500">
                                                {formData.contentType === "image" ? "PNG, JPG, WEBP up to 10MB" : "MP4, MOV up to 50MB"}
                                            </p>
                                        </label>
                                    </div>
                                ) : (
                                    <div className="relative">
                                        {formData.contentType === "image" ? (
                                            <img src={preview} alt="Preview" className="w-full h-auto rounded-xl border border-gray-200" />
                                        ) : (
                                            <video src={preview} controls className="w-full h-auto rounded-xl border border-gray-200" />
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPreview(null);
                                                setFormData({ ...formData, file: null });
                                            }}
                                            className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                                        >
                                            <XCircle size={20} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Details Card */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 space-y-5">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Content Details</h2>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="E.g., Sunset Over Mountains"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe your content..."
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                    required
                                >
                                    <option value="photography">Photography</option>
                                    <option value="illustration">Illustration</option>
                                    <option value="vector">Vector</option>
                                    <option value="nature">Nature</option>
                                    <option value="business">Business</option>
                                    <option value="technology">Technology</option>
                                    <option value="people">People</option>
                                    <option value="abstract">Abstract</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    placeholder="sunset, mountain, nature, landscape"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                />
                                <p className="text-xs text-gray-500 mt-2">Add relevant tags to help buyers find your content</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-2">Price (USD) *</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="9.99"
                                        step="0.01"
                                        min="0"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={isUploading || !formData.file}
                                className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${isUploading || !formData.file
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                                    }`}
                            >
                                {isUploading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload size={20} />
                                        Upload Content
                                    </>
                                )}
                            </button>

                            <Link
                                href="/seller-dashboard"
                                className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellerUploadPage;
