"use client";

import React, { useState } from "react";
import { Upload, X, Image as ImageIcon, Film, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddContentPage() {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Handle drag events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // Handle drop event
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    // Handle manual file selection
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    // File processing
    const handleFile = (file) => {
        setSelectedFile(file);
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
    };

    const removeFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    return (
        <div className="min-h-screen bg-black text-gray-100 p-8">
            {/* Header Section */}
            <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between border-b border-gray-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Add New Content</h1>
                    <p className="text-gray-400 mt-2">Upload images or videos to your stock collection.</p>
                </div>
                <Link
                    href="/content"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to List
                </Link>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left Column: File Upload Area */}
                <div className="lg:col-span-1">
                    <div
                        className={`relative h-96 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all duration-300 ${dragActive
                            ? "border-purple-500 bg-purple-500/10"
                            : "border-gray-700 bg-gray-900 hover:border-gray-500"
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        {previewUrl ? (
                            <div className="relative w-full h-full p-2">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-xl"
                                />
                                <button
                                    onClick={removeFile}
                                    className="absolute top-4 right-4 bg-red-600 p-1.5 rounded-full hover:bg-red-700 transition"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        ) : (
                            <div className="text-center p-6">
                                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Upload className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-white">Drag & Drop Media</h3>
                                <p className="text-sm text-gray-500 mt-2 mb-4">or click to browse files</p>
                                <p className="text-xs text-gray-600">Supports: JPG, PNG, MP4 (Max 50MB)</p>
                                <input
                                    type="file"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleChange}
                                    accept="image/*,video/*"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Form Details */}
                <div className="lg:col-span-2 bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
                    <form className="space-y-6">

                        {/* Title Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Content Title</label>
                            <input
                                type="text"
                                placeholder="e.g. Modern Office Workspace"
                                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                            />
                        </div>

                        {/* Description Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                            <textarea
                                rows="4"
                                placeholder="Describe your content..."
                                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition resize-none"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Category Select */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                                <div className="relative">
                                    <select className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-purple-500">
                                        <option>Select Category</option>
                                        <option>Photography</option>
                                        <option>Video Footage</option>
                                        <option>Vector Art</option>
                                        <option>3D Models</option>
                                    </select>
                                    <div className="absolute right-4 top-3.5 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Price Input */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Price ($)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                                />
                            </div>
                        </div>

                        {/* Access Level (Radio Buttons) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-3">Access Level</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 cursor-pointer border border-gray-700 rounded-lg p-3 w-full hover:bg-gray-800 transition">
                                    <input type="radio" name="access" className="accent-purple-500" defaultChecked />
                                    <span className="text-sm">Free Asset</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer border border-gray-700 rounded-lg p-3 w-full hover:bg-gray-800 transition">
                                    <input type="radio" name="access" className="accent-purple-500" />
                                    <span className="text-sm text-purple-400 font-medium">Exclusive (Premium)</span>
                                </label>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-6 flex items-center justify-end gap-4 border-t border-gray-800 mt-6">
                            <button
                                type="button"
                                className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex items-center gap-2 px-8 py-2.5 rounded-lg text-sm font-medium bg-white text-black hover:bg-gray-200 transition shadow-lg shadow-white/10"
                            >
                                <Save className="w-4 h-4" />
                                Publish Content
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}