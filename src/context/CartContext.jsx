import { useCallback, useEffect, useMemo, useState } from "react";
import CartContext from "./cart-context";

const STORAGE_KEY = "nexus-course-cart";
function readCart() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => item?.code && item?.slug) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => (typeof window === "undefined" ? [] : readCart()));
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addCourse = useCallback((course) => {
    if (items.some((item) => item.code === course.code)) {
      setAnnouncement(`${course.code} is already in your course cart.`);
      return;
    }
    setAnnouncement(`${course.code} was added to your course cart.`);
    setItems((current) => [...current, {
        code: course.code,
        title: course.title,
        slug: course.slug,
        grade: course.grade,
        type: course.type,
        credit: course.credit,
        prerequisite: course.prerequisite,
        department: course.department,
      }]);
  }, [items]);

  const removeCourse = useCallback((code) => {
    setItems((current) => current.filter((item) => item.code !== code));
    setAnnouncement(`${code} was removed from your course cart.`);
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAnnouncement("Your course cart was cleared.");
  }, []);

  const value = useMemo(() => ({
    items,
    count: items.length,
    announcement,
    addCourse,
    removeCourse,
    clearCart,
    hasCourse: (code) => items.some((item) => item.code === code),
  }), [addCourse, announcement, clearCart, items, removeCourse]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
    </CartContext.Provider>
  );
}
