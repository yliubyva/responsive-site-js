import { createBrowserRouter } from "react-router-dom";
import { Root } from "./Layouts/Root";
import { CurrentInfo } from "./components/CurrentInfo";
import { SecondaryInfo } from "./components/SecondaryInfo";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: CurrentInfo,
            },
            {
                path: "forecast-5-day/",
                Component: SecondaryInfo,
            },
        ]
    }
])