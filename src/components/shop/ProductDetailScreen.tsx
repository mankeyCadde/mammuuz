import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  RefreshCw,
  Heart,
  ShoppingBag,
  Check,
  Share2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { Product, ProductColor, ScreenType } from '../../types';
import { Breadcrumbs } from '../common/Breadcrumbs';

interface ProductDetailScreenProps {
  product: Product;
  allProducts: Product[];
  onAddToCart: (product: Product, quantity: number, color?: ProductColor) => void;
  onBuyNow: (product: Product, quantity: number, color?: ProductColor) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onSelectProduct: (prod: Product) => void;
  onNavigate: (screen: ScreenType) => void;
  onAddToast: (title: string, desc?: string, type?: 'success' | 'info' | 'error') => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  allProducts,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct,
  onNavigate,
  onAddToast,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.gallery[0] || product.image);
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0] : undefined
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'shipping' | 'reviews'>('overview');

  // Review form state
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState(product.reviewsList);

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onAddToast('Link Copied', 'Product link copied to your clipboard.');
    } else {
      onAddToast('Share', `Sharing ${product.name}`);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      onAddToast('Missing Information', 'Please fill in your name and comment.', 'error');
      return;
    }

    const newRev = {
      id: `rev-${Date.now()}`,
      author: reviewName,
      rating: reviewRating,
      date: 'Just now',
      title: reviewTitle || 'Verified Feedback',
      comment: reviewComment,
      verifiedPurchase: true,
    };

    setLocalReviews([newRev, ...localReviews]);
    setIsWritingReview(false);
    setReviewName('');
    setReviewTitle('');
    setReviewComment('');
    onAddToast('Review Submitted', 'Thank you for your valued feedback on this artifact.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-10 pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Shop Catalog', screen: 'shop' },
          { label: product.category, screen: 'shop' },
          { label: product.name },
        ]}
        onNavigate={onNavigate}
      />

      {/* Main Product Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6">
        {/* Left Column: Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Display Image */}
          <div className="relative aspect-[4/3] sm:aspect-square bg-white rounded-2xl border border-[#c3c7c8]/40 overflow-hidden shadow-sm">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {product.badge && (
              <span
                className={`absolute top-4 left-4 text-xs uppercase font-bold tracking-wider px-3 py-1 rounded shadow-xs ${
                  product.badge.type === 'sale'
                    ? 'bg-rose-500 text-white'
                    : product.badge.type === 'gold'
                    ? 'bg-amber-500 text-white'
                    : 'bg-[#00b894] text-white'
                }`}
              >
                {product.badge.text}
              </span>
            )}

            <button
              type="button"
              onClick={handleShare}
              className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-xs rounded-full text-[#181f21] hover:bg-white shadow-xs transition-colors cursor-pointer"
              title="Share Artifact"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {product.gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    selectedImage === img ? 'border-[#0060a9] shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Purchasing & Specifications (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-[#747879] mb-1.5 font-['Inter']">
              <span className="uppercase tracking-wider font-semibold text-[#0060a9]">{product.category}</span>
              <span className="text-[11px] text-[#00b894] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00b894]"></span>
                In Stock ({product.stockCount} units available)
              </span>
            </div>

            <h1 className="font-['Hanken_Grotesk'] text-2xl sm:text-3xl font-extrabold text-[#181f21] leading-tight">
              {product.name}
            </h1>

            {/* Rating summary */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-[#181f21]">{product.rating}</span>
              <span className="text-xs text-[#747879]">•</span>
              <button
                onClick={() => setActiveTab('reviews')}
                className="text-xs text-[#0060a9] hover:underline font-medium cursor-pointer"
              >
                {localReviews.length} Verified Reviews
              </button>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-white rounded-xl border border-[#c3c7c8]/40 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-['Hanken_Grotesk'] text-2xl sm:text-3xl font-extrabold text-[#181f21]">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#747879] line-through">${product.originalPrice}</span>
                )}
              </div>
              <p className="text-[11px] text-[#747879] mt-0.5">Duties and local taxes calculated at checkout</p>
            </div>

            {product.discountPercent && (
              <span className="px-2.5 py-1 rounded bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold">
                Save {product.discountPercent}%
              </span>
            )}
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#181f21]">Color Finish:</span>
                <span className="text-[#0060a9] font-medium">{selectedColor?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                      selectedColor?.name === c.name ? 'border-[#0060a9] scale-110 shadow-xs' : 'border-transparent'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full border border-black/15 flex items-center justify-center text-white"
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedColor?.name === c.name && <Check className="w-3 h-3 text-white drop-shadow-md" />}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-[#c3c7c8]/70 bg-white rounded-lg p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center text-[#181f21] hover:bg-[#f1fbff] rounded font-bold cursor-pointer"
              >
                -
              </button>
              <span className="w-10 text-center font-['Hanken_Grotesk'] text-sm font-bold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                className="w-8 h-8 flex items-center justify-center text-[#181f21] hover:bg-[#f1fbff] rounded font-bold cursor-pointer"
              >
                +
              </button>
            </div>

            <div className="text-xs text-[#747879]">
              Subtotal: <strong className="text-[#181f21]">${(product.price * quantity).toFixed(2)}</strong>
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="space-y-2 pt-2">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => onAddToCart(product, quantity, selectedColor)}
                className="flex-1 py-3.5 bg-[#181f21] hover:bg-[#0060a9] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-300 text-rose-600'
                    : 'bg-white border-[#c3c7c8]/70 hover:bg-[#F9FAFB] text-[#181f21]'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => onBuyNow(product, quantity, selectedColor)}
              className="w-full py-3.5 bg-[#0060a9] hover:bg-[#0984E3] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Instant Express Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Guarantee Highlights */}
          <div className="p-4 bg-[#eaf5fa] rounded-xl border border-[#0060a9]/20 space-y-2.5 text-xs text-[#181f21]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#0060a9] shrink-0" />
              <span>Complimentary insured DHL Express courier dispatch</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-[#0060a9] shrink-0" />
              <span>30-day trial period with prepaid door-to-door returns</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#0060a9] shrink-0" />
              <span>Individual serial number & certificate of authenticity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion / Tabs Section */}
      <div className="mt-16 bg-white rounded-2xl border border-[#c3c7c8]/40 overflow-hidden shadow-xs">
        <div className="flex border-b border-[#c3c7c8]/30 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Craft' },
            { id: 'specs', label: 'Specifications' },
            { id: 'shipping', label: 'Shipping & Returns' },
            { id: 'reviews', label: `Reviews (${localReviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-b-2 border-[#0060a9] text-[#0060a9] bg-[#f1fbff]'
                  : 'text-[#747879] hover:text-[#181f21]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8 font-['Inter'] text-sm">
          {activeTab === 'overview' && (
            <div className="max-w-3xl space-y-4">
              <h3 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21]">
                Masterpiece Engineering & Atelier Standards
              </h3>
              <p className="text-[#434749] leading-relaxed">{product.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#c3c7c8]/30">
                  <h4 className="font-bold text-xs uppercase text-[#181f21] mb-1">Materials Sourcing</h4>
                  <p className="text-xs text-[#747879]">
                    Strictly free from synthetic micro-plastics and engineered veneers. Only raw medical-grade alloys, Tuscan vegetable leathers, and precision optics.
                  </p>
                </div>
                <div className="p-4 bg-[#F9FAFB] rounded-xl border border-[#c3c7c8]/30">
                  <h4 className="font-bold text-xs uppercase text-[#181f21] mb-1">Lifetime Care</h4>
                  <p className="text-xs text-[#747879]">
                    Every artifact is eligible for periodic refurbishment, mechanical recalibration, and leather nourishment by our European concierge.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl space-y-3">
              <h3 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21] mb-4">
                Technical Blueprint
              </h3>
              <div className="divide-y divide-[#c3c7c8]/30 border border-[#c3c7c8]/30 rounded-xl overflow-hidden bg-white">
                {product.specs.map((spec, i) => (
                  <div key={i} className="p-3.5 text-xs flex items-center justify-between">
                    <span className="font-semibold text-[#181f21]">{spec.split(':')[0]}</span>
                    <span className="text-[#747879]">{spec.split(':')[1] || spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="max-w-3xl space-y-4 text-xs text-[#434749] leading-relaxed">
              <h3 className="font-['Hanken_Grotesk'] text-lg font-bold text-[#181f21]">
                Complimentary White-Glove Dispatch
              </h3>
              <p>
                All orders are dispatched from our European distribution center in reinforced presentation boxes with tamper-evident serial seals.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>North America & Europe: 1–3 business days via DHL Express</li>
                <li>Asia-Pacific & Middle East: 2–4 business days via FedEx Priority</li>
                <li>All shipments are 100% insured against loss or damage in transit</li>
              </ul>
              <h4 className="font-['Hanken_Grotesk'] text-sm font-bold text-[#181f21] pt-2">
                Hassle-Free Doorstep Collection
              </h4>
              <p>
                Should you wish to exchange or return your item within 30 days of arrival, contact our concierge to schedule a complimentary courier collection from your residence or office.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#c3c7c8]/30">
                <div>
                  <h3 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#181f21]">
                    Patron Reviews & Observations
                  </h3>
                  <p className="text-xs text-[#747879] mt-0.5">
                    {localReviews.length} reviews with an average score of {product.rating} / 5.0
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsWritingReview(!isWritingReview)}
                  className="px-4 py-2 bg-[#181f21] hover:bg-[#0060a9] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
                >
                  {isWritingReview ? 'Cancel Review' : 'Write a Review'}
                </button>
              </div>

              {/* Review Write Form */}
              {isWritingReview && (
                <form onSubmit={handleAddReview} className="p-6 bg-[#F9FAFB] rounded-xl border border-[#c3c7c8]/40 space-y-4">
                  <h4 className="font-['Hanken_Grotesk'] text-sm font-bold text-[#181f21]">
                    Share your experience with {product.name}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#181f21] block mb-1">Your Name</label>
                      <input
                        type="text"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="e.g. Sterling H."
                        className="w-full bg-white border border-[#c3c7c8] rounded-lg px-3 py-2 text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#181f21] block mb-1">Rating</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full bg-white border border-[#c3c7c8] rounded-lg px-3 py-2 text-xs"
                      >
                        <option value={5}>5 Stars - Outstanding</option>
                        <option value={4}>4 Stars - Very Pleased</option>
                        <option value={3}>3 Stars - Satisfactory</option>
                        <option value={2}>2 Stars - Needs Refinement</option>
                        <option value={1}>1 Star - Dissatisfied</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#181f21] block mb-1">Review Headline</label>
                    <input
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="e.g. Masterful finish and weight"
                      className="w-full bg-white border border-[#c3c7c8] rounded-lg px-3 py-2 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#181f21] block mb-1">Detailed Commentary</label>
                    <textarea
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Describe the tactile sensation, build quality, and everyday utility..."
                      className="w-full bg-white border border-[#c3c7c8] rounded-lg px-3 py-2 text-xs"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#0060a9] hover:bg-[#0984E3] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              )}

              {/* Reviews List */}
              {localReviews.length === 0 ? (
                <p className="text-xs text-[#747879] py-4 italic">
                  No written reviews yet for this artifact. Be the first patron to share your impressions.
                </p>
              ) : (
                <div className="space-y-4">
                  {localReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl border border-[#c3c7c8]/30 bg-[#F9FAFB] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-['Hanken_Grotesk'] text-xs font-bold text-[#181f21]">
                            {rev.author}
                          </span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] bg-[#00b894]/10 text-[#00b894] font-semibold px-2 py-0.5 rounded">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#747879]">{rev.date}</span>
                      </div>

                      <div className="flex text-amber-500 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>

                      {rev.title && <h5 className="text-xs font-bold text-[#181f21]">{rev.title}</h5>}
                      <p className="text-xs text-[#434749] leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0060a9]">
                Complementary Pieces
              </span>
              <h2 className="font-['Hanken_Grotesk'] text-2xl font-extrabold text-[#181f21] mt-1">
                You May Also Admire
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectProduct(item)}
                className="group bg-white rounded-xl border border-[#c3c7c8]/50 overflow-hidden hover:border-[#0060a9] hover:shadow-lg transition-all cursor-pointer flex flex-col"
              >
                <div className="relative aspect-square bg-[#f8fafc] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[11px] text-[#747879]">{item.category}</span>
                  <h4 className="font-['Hanken_Grotesk'] text-sm font-bold text-[#181f21] group-hover:text-[#0060a9] transition-colors line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="font-['Hanken_Grotesk'] text-sm font-bold text-[#181f21] pt-1">
                    ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
