export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-ink text-bone/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row justify-between gap-6 text-sm">
        <div>
          <p className="font-display italic text-xl text-bone mb-2">Meridian</p>
          <p className="max-w-xs">Everyday goods, thoughtfully made and built to be used.</p>
        </div>
        <div className="flex gap-12">
          <div>
            <p className="text-bone font-medium mb-2">Shop</p>
            <p>New arrivals</p>
            <p>Best sellers</p>
          </div>
          <div>
            <p className="text-bone font-medium mb-2">Help</p>
            <p>Shipping</p>
            <p>Returns</p>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-bone/50 pb-6">
        &copy; {new Date().getFullYear()} Meridian. Demo storefront for learning purposes.
      </p>
    </footer>
  );
}
