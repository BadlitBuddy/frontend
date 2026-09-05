import Header from "@/features/marketing/components/Header";
import Footer from "@/features/marketing/components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-theme="badlitbuddy" className="flex flex-col antialiased">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
