"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, Upload, Image as ImageIcon, CheckCircle, XCircle, Tag, DollarSign, FileText
} from 'lucide-react';

const SellerUploadPage = () => {
    const router = useRouter();
    const [isUploading, setIsUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [preview, setPreview] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'photography',
        tags: '',
        price: '',
        file: null
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please select an image file');
                return;
            }

            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                setError('File size must be less than 10MB');
                return;
            }

            setFormData({ ...formData, file });

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setError('');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Validation
        if (!formData.file) {
            setError('Please select an image to upload');
            return;
        }

        if (!formData.title || !formData.price) {
            setError('Title and price are required');
            return;
        }

        setIsUploading(true);

        try {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user') || '{}');

            // Create FormData for file upload
            const uploadData = new FormData();
            uploadData.append('image', formData.file);
            uploadData.append('title', formData.title);
            uploadData.append('description', formData.description);
            uploadData.append('category', formData.category);
            uploadData.append('tags', formData.tags);
            uploadData.append('price', formData.price);
            uploadData.append('sellerId', user.id);

            const response = await fetch('http://localhost:5000/api/seller/upload-image', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: uploadData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Upload failed');
            }

            setSuccess(true);
            setFormData({
                title: '',
                description: '',
                category: 'photography',
                tags: '',
                price: '',
                file: null
            });
            setPreview(null);

            // Redirect after 2 seconds
            setTimeout(() => {
                router.push('/seller-dashboard');
            }, 2000);

        } catch (err) {
            console.error('Upload error:', err);
            setError(err.message || 'Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/seller-dashboard"
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={24} className="text-gray-700" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Upload Image</h1>
                            <p className="text-sm text-gray-500">Share your creative work with buyers</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Success Message */}
                {success && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center gap-4 mb-6 animate-fadeIn">
                        <CheckCircle size={24} className="text-green-600" />
                        <div>
                            <h3 className="text-green-900 font-bold">Image Uploaded Successfully!</h3>
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
                    {/* Image Upload */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Your Image</h2>

                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-900 mb-3">
                                Select Image *
                            </label>

                            {!preview ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer"
                                    >
                                        <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                                        <p className="text-gray-600 font-medium mb-2">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            PNG, JPG, WEBP up to 10MB
                                        </p>
                                    </label>
                                </div>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-full h-auto rounded-xl border border-gray-200"
                                    />
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

                    {/* Image Details */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 space-y-5">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Image Details</h2>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Title *
                            </label>
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

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe your image..."
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Category *
                            </label>
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

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Tags (comma separated)
                            </label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                placeholder="sunset, mountain, nature, landscape"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Add relevant tags to help buyers find your image
                            </p>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Price (USD) *
                            </label>
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

                    {/* Submit Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={isUploading || !formData.file}
                            className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${isUploading || !formData.file
                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
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
                                    Upload Image
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
    );
};

export default SellerUploadPage;
