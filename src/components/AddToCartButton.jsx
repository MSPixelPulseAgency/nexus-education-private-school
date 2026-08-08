import { Check, ShoppingCart } from "lucide-react";
import useCart from "../hooks/useCart";

export default function AddToCartButton({ course, className = "btn btn-primary", compact = false }) {
  const { addCourse, hasCourse } = useCart();
  const added = hasCourse(course.code);
  return (
    <button
      className={`${className} add-cart-button ${added ? "is-added" : ""}`}
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        addCourse(course);
      }}
      aria-label={added ? `${course.code} is already in course cart` : `Add ${course.code} to course cart`}
    >
      {added ? <Check size={compact ? 15 : 17} /> : <ShoppingCart size={compact ? 15 : 17} />}
      {added ? "In Cart" : compact ? "Add" : "Add to Cart"}
    </button>
  );
}
