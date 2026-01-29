"use client";

import React, { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { deleteItem } from '@/app/actions/itemActions'; // Importing the server action

/**
 * RemoveItemModal Component
 * 
 * Specifically designed to handle the 'Remove Item' feature for the marketplace.
 * Follows strict requirements for 'use client', loading states, and pointer-events fixes.
 */
const ConfirmationModal = ({
    isOpen,
    onClose,
    itemId,
    itemTitle,
    sellerId,
    userRole,
    redirectPath = '/', // Default redirect to home
    onSuccess = null    // Optional callback
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Function to handle the deletion logic
    const handleDelete = async (e) => {
        // Prevent event bubbling just in case
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Fallbacks if props are missing
        const effectiveRole = userRole || localStorage.getItem("userRole");
        const effectiveSellerId = sellerId || (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null);

        const isAdmin = effectiveRole && ['admin', 'super_admin', 'manager'].includes(effectiveRole.toLowerCase().trim());

        // Guard: We need the item ID, and either the seller's own ID or an admin role
        if (!itemId || (!effectiveSellerId && !isAdmin)) {
            console.error("Missing required IDs for deletion", { itemId, effectiveSellerId, effectiveRole });
            alert("Unable to proceed: User session data is incomplete.");
            return;
        }

        setIsLoading(true);

        try {
            // Calling the Server Action
            const result = await deleteItem(itemId, effectiveSellerId, effectiveRole);

            if (result.success) {
                console.log("Item deleted successfully");

                // 1. Refresh the page data immediately
                router.refresh();

                // 2. Execute callback if provided
                if (onSuccess) onSuccess();

                // 3. Redirect/Close logic
                onClose();

                if (redirectPath) {
                    router.push(redirectPath);
                }
            } else {
                alert(result.message || "Failed to remove item.");
            }
        } catch (error) {
            console.error("Error in handleDelete:", error);
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        /* 
           Modal Backdrop/Overlay Container 
           pointer-events-none ensures the container itself doesn't block clicks 
           while we use pointer-events-auto on the modal content.
        */
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in pointer-events-none">

            {/* 
                Modal Content Card
                pointer-events-auto re-enables clicks for the interactive elements 
            */}
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform animate-zoom-in pointer-events-auto relative shadow-black/20"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button Header */}
                <div className="flex justify-end p-4 absolute right-0 top-0 z-10">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body Content */}
                <div className="px-8 pt-10 pb-6 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                        <AlertTriangle className="text-red-500" size={40} />
                    </div>

                    <h2 className="text-2xl font-black text-gray-900 mb-3">Remove Item?</h2>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        Are you sure you want to remove <span className="font-bold text-gray-900">"{itemTitle || 'this item'}"</span>?
                        This action will hide it from the marketplace and cannot be undone easily.
                    </p>
                </div>

                {/* Footer Buttons */}
                <div className="px-8 py-6 bg-gray-50 flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-6 py-4 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-all duration-200 border border-gray-200 cursor-pointer disabled:opacity-50"
                    >
                        No, keep it
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isLoading}
                        /* 
                           Vibrant Red Styling 
                           bg-red-600 is the standard professional red
                           hover:bg-red-700 for depth
                           shadow implementation matches premium designs
                        */
                        className="flex-[1.5] px-6 py-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-red-200 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Removing...</span>
                            </>
                        ) : (
                            <span>Yes, Remove</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
