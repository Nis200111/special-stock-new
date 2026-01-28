"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    CheckCircle,
    XCircle,
    Eye,
    Image as ImageIcon,
    Filter,
    Search,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    Video
} from "lucide-react";
import styles from "./image-approval.module.css";

export default function ImageApprovalPage() {
    const router = useRouter();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("pending");
    const [category, setCategory] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedImages, setSelectedImages] = useState([]);
    const [processingAction, setProcessingAction] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [showRejectModal, setShowRejectModal] = useState(null);

    useEffect(() => {
        // Check if user is admin
        const userRole = localStorage.getItem("userRole");
        if (userRole !== "admin") {
            router.push("/dashboard");
            return;
        }

        fetchImages();
    }, [filter, category, page]);

    async function fetchImages() {
        setLoading(true);
        try {
            const endpoint = filter === "pending"
                ? `/api/admin/pending-images`
                : `/api/admin/all-images`;

            const params = new URLSearchParams({
                page: page.toString(),
                limit: "12",
                ...(filter !== "pending" && { status: filter }),
                ...(category !== "all" && { category }),
                ...(searchTerm && { search: searchTerm })
            });

            const response = await fetch(
                `http://localhost:5000${endpoint}?${params}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                setImages(data.data.images);
                setTotalPages(data.data.pagination.totalPages);
            }
        } catch (error) {
            console.error("Failed to fetch images:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleApprove(imageId) {
        setProcessingAction(imageId);
        try {
            const response = await fetch(
                `http://localhost:5000/api/admin/approve-image/${imageId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            const data = await response.json();

            if (data.success) {
                // Remove from list or update status
                setImages(prev => prev.filter(img => img.id !== imageId));
                // Show success notification
                alert(`✅ Image "${data.data.title}" approved successfully!`);
            }
        } catch (error) {
            console.error("Failed to approve image:", error);
            alert("❌ Failed to approve image. Please try again.");
        } finally {
            setProcessingAction(null);
        }
    }

    async function handleReject(imageId, reason) {
        setProcessingAction(imageId);
        try {
            const response = await fetch(
                `http://localhost:5000/api/admin/reject-image/${imageId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ reason })
                }
            );

            const data = await response.json();

            if (data.success) {
                setImages(prev => prev.filter(img => img.id !== imageId));
                setShowRejectModal(null);
                setRejectionReason("");
                alert(`❌ Image rejected successfully`);
            }
        } catch (error) {
            console.error("Failed to reject image:", error);
            alert("Failed to reject image. Please try again.");
        } finally {
            setProcessingAction(null);
        }
    }

    async function handleBatchApprove() {
        if (selectedImages.length === 0) return;

        try {
            const response = await fetch(
                `http://localhost:5000/api/admin/batch-approve`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ imageIds: selectedImages })
                }
            );

            const data = await response.json();

            if (data.success) {
                setImages(prev => prev.filter(img => !selectedImages.includes(img.id)));
                setSelectedImages([]);
                alert(`✅ ${data.count} images approved successfully!`);
            }
        } catch (error) {
            console.error("Failed to batch approve:", error);
            alert("Failed to approve images. Please try again.");
        }
    }

    function toggleSelectImage(imageId) {
        setSelectedImages(prev =>
            prev.includes(imageId)
                ? prev.filter(id => id !== imageId)
                : [...prev, imageId]
        );
    }

    if (loading && images.length === 0) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading images...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div>
                        <h1 className={styles.title}>Image Approval Dashboard</h1>
                        <p className={styles.subtitle}>
                            Review and approve seller submissions
                        </p>
                    </div>
                    <Link href="/dashboard" className={styles.backButton}>
                        ← Back to Dashboard
                    </Link>
                </div>
            </header>

            {/* Filters */}
            <div className={styles.filtersSection}>
                <div className={styles.filters}>
                    {/* Status Filter */}
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>
                            <Filter size={16} />
                            Status
                        </label>
                        <select
                            value={filter}
                            onChange={(e) => {
                                setFilter(e.target.value);
                                setPage(1);
                            }}
                            className={styles.select}
                        >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="all">All</option>
                        </select>
                    </div>

                    {/* Category Filter */}
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Category</label>
                        <select
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setPage(1);
                            }}
                            className={styles.select}
                        >
                            <option value="all">All Categories</option>
                            <option value="photography">Photography</option>
                            <option value="illustration">Illustration</option>
                            <option value="vector">Vector</option>
                            <option value="nature">Nature</option>
                            <option value="business">Business</option>
                        </select>
                    </div>

                    {/* Search */}
                    <div className={styles.searchBox}>
                        <Search size={18} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search images..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && fetchImages()}
                            className={styles.searchInput}
                        />
                    </div>

                    {/* Batch Actions */}
                    {selectedImages.length > 0 && (
                        <button
                            onClick={handleBatchApprove}
                            className={styles.batchApproveBtn}
                        >
                            <CheckCircle size={18} />
                            Approve Selected ({selectedImages.length})
                        </button>
                    )}
                </div>
            </div>

            {/* Images Grid */}
            <div className={styles.content}>
                {images.length === 0 ? (
                    <div className={styles.emptyState}>
                        <ImageIcon size={64} className={styles.emptyIcon} />
                        <h3>No images found</h3>
                        <p>There are no {filter} images at the moment.</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {images.map((image) => (
                            <div key={image.id} className={styles.card}>
                                {/* Selection Checkbox */}
                                {filter === "pending" && (
                                    <input
                                        type="checkbox"
                                        checked={selectedImages.includes(image.id)}
                                        onChange={() => toggleSelectImage(image.id)}
                                        className={styles.checkbox}
                                    />
                                )}

                                {/* Image Preview */}
                                <div className={styles.imageWrapper}>
                                    {(image.contentType === 'video' || image.filename?.match(/\.(mp4|mov|quicktime)$/i)) ? (
                                        <div className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center">
                                            <video
                                                src={`http://localhost:5000${image.filepath}`}
                                                controls
                                                className="w-full h-full object-contain"
                                            />
                                            <div className="absolute top-2 right-2 bg-black/50 p-1 rounded-md pointer-events-none">
                                                <Video size={16} className="text-white" />
                                            </div>
                                        </div>
                                    ) : (
                                        <img
                                            src={`http://localhost:5000${image.thumbnailPath || image.watermarkedFilepath || image.filepath}`}
                                            alt={image.title}
                                            className={styles.image}
                                        />
                                    )}
                                    <div className={styles.overlay}>
                                        <span className={`${styles.badge} ${styles[image.status]}`}>
                                            {image.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Image Info */}
                                <div className={styles.cardContent}>
                                    <h3 className={styles.imageTitle}>{image.title}</h3>
                                    <p className={styles.imageDesc}>
                                        {image.description?.slice(0, 80)}
                                        {image.description?.length > 80 && "..."}
                                    </p>

                                    <div className={styles.imageMeta}>
                                        <span className={styles.category}>{image.category}</span>
                                        <span className={styles.price}>${image.price}</span>
                                    </div>

                                    <div className={styles.imageStats}>
                                        <span>
                                            <Eye size={14} /> {image.views || 0} views
                                        </span>
                                        <span>
                                            ID: {image.id}
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    {filter === "pending" && (
                                        <div className={styles.actions}>
                                            <button
                                                onClick={() => handleApprove(image.id)}
                                                disabled={processingAction === image.id}
                                                className={styles.approveBtn}
                                            >
                                                <CheckCircle size={16} />
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => setShowRejectModal(image.id)}
                                                disabled={processingAction === image.id}
                                                className={styles.rejectBtn}
                                            >
                                                <XCircle size={16} />
                                                Reject
                                            </button>
                                        </div>
                                    )}

                                    {/* Rejection Reason */}
                                    {image.status === "rejected" && image.rejectionReason && (
                                        <div className={styles.rejectionReason}>
                                            <AlertCircle size={14} />
                                            {image.rejectionReason}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            onClick={() => setPage(prev => Math.max(1, prev - 1))}
                            disabled={page === 1}
                            className={styles.paginationBtn}
                        >
                            <ChevronLeft size={18} />
                            Previous
                        </button>
                        <span className={styles.pageInfo}>
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={page === totalPages}
                            className={styles.paginationBtn}
                        >
                            Next
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}
            </div>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Reject Image</h3>
                        <p>Please provide a reason for rejection:</p>
                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="E.g., Low quality, inappropriate content, copyright issues..."
                            className={styles.textarea}
                            rows={4}
                        />
                        <div className={styles.modalActions}>
                            <button
                                onClick={() => handleReject(showRejectModal, rejectionReason)}
                                className={styles.confirmRejectBtn}
                            >
                                Confirm Rejection
                            </button>
                            <button
                                onClick={() => {
                                    setShowRejectModal(null);
                                    setRejectionReason("");
                                }}
                                className={styles.cancelBtn}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
