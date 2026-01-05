"use client";

import React from "react";
import { Navbar, Footer } from "@/components";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";

export default function CartPage() {
    // Placeholder cart data
    const cartItems = []; // Empty for now to show the empty state

    return (
        <main className="min-h-screen bg-white flex flex-col">
            <Navbar />

            <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
                <div className="flex items-center gap-2 mb-8">
                    <Link href="/" className="text-gray-500 hover:text-black transition-colors flex items-center gap-1">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to shopping</span>
                    </Link>
                </div>

                <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                        <div className="bg-gray-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingCart className="h-10 w-10 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any assets to your cart yet.</p>
                        <Link
                            href="/"
                            className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors inline-block"
                        >
                            Browse Assets
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Placeholder for items */}
                            <p>Item list goes here...</p>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-gray-50 p-8 rounded-2xl h-fit border border-gray-100">
                            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                            <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Taxes</span>
                                    <span>$0.00</span>
                                </div>
                            </div>
                            <div className="flex justify-between font-bold text-xl mb-8">
                                <span>Total</span>
                                <span>$0.00</span>
                            </div>
                            <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors">
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
