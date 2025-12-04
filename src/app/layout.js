import "@/styles/globals.css";
import LayoutWrapper from "@/layouts/LayoutWrapper";
import {LanguageProvider} from "@/providers/LanguageProvider";
import {QueryProvider} from "@/providers/QueryProvider";

export const metadata = {
    title: "dashboard",
    description: "올페이즈 대시보드 과제",
};

export default function RootLayout({ children }) {
    return (
        <html lang="kr">
            <body>
                <LanguageProvider>
                    <QueryProvider>
                        <LayoutWrapper>{children}</LayoutWrapper>
                        {/*{children}*/}
                    </QueryProvider>
                </LanguageProvider>
            </body>
        </html>
    );
}