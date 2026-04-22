import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * Marketing site layout — adds the public Navbar and Footer.
 * Admin routes intentionally bypass this layout.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
