import { Sidebar } from "../../components/sidebar/Sidebar";
import style from "./Home.module.css";

export const Home = () => {
    return (
        <div className={style.container}>
            <Sidebar />
        </div>
    );
};
