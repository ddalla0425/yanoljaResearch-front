import "@/styles/globals.css";
import LayoutWrapper from "@/layouts/LayoutWrapper";
import {LanguageProvider} from "@/providers/LanguageProvider";
import {QueryProvider} from "@/providers/QueryProvider";

export const metadata = {
    title: "야놀자리서치",
    description: "야놀자 리서치 클론 페이지",
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