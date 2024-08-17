import React, { useEffect, useState } from "react";
import Lobbynavbar from "../fragment/Lobbynavbar";
import { getUsername } from "../services/auth.service";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {dataGames} from "../services/api.service";

export const LobbyGamesMobilePage = () => {
    const [username, setUsername] = useState("");
    const [dataIframe, setDataIframe] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { namegames } = useParams();
    const game = dataGames
        .flatMap(game => game.listgame)
        .find(listgame => listgame.url === namegames);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const access = localStorage.getItem("acme");
        if (!username && token && access) {
            setUsername(getUsername(token));
        } else if (!token) {
            window.location.href = "/";
        }
    }, [username]);

    const renderSkeletonone = () => {
        return (
            <div className="listdatalive skeleton mobilegames">
                <div className="loader"></div>
            </div>
        );
    };

    useEffect(() => {
        const access = localStorage.getItem("acme");
        const fetchDataIframe = async () => {
            if (!username) return;
            if (!game) {
                console.error("Game not found");
                return;
            }

            if (game.versimobile === false) {
                Swal.fire({
                    icon: "info",
                    title: "Opps",
                    text: "Versi mobile belum tersedia. Klik OK untuk mengakses versi desktop.",
                }).then(() => {
                    navigate(game.dekstopurl);
                });
                return;
            }

            try {
                const response = await fetch(game.request, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        utilitiesgenerate: import.meta.env.VITE_CR_ONE_UTILI,
                        Authorization: `Bearer ${access}`,
                        'x-customblhdrs': import.meta.env.VITE_CR_ONE_AUTHORIZATION_TOKEN
                    },
                    body: JSON.stringify({
                        username: username,
                        iswap: false,
                        device: "m"
                    }),
                });

                if (response.ok) {
                    const data = await response.json();

                    if (data.is_suspend === true) {
                        Swal.fire({
                            icon: "info",
                            title: "Akun Blokir",
                            text: "Akun anda di blokir sementara waktu. Silahkan hubungi Admin",
                        }).then(() => {
                            navigate("/kontak");
                        });
                    } else if (data.is_maintenance === true) {
                        Swal.fire({
                            icon: "info",
                            title: "Maintenance",
                            text: "Saat ini sedang dalam Pemeliharaan. Silahkan hubungi Admin",
                        }).then(() => {
                            navigate("/lobby");
                        });
                    } else {
                        setDataIframe(data.url);
                        setIsLoading(false);
                    }
                } else {
                    console.error("Failed to fetch parlay URL");
                }
            } catch (error) {
                console.error("Error fetching parlay URL:", error);
            }
        };

        fetchDataIframe();
    }, [username, namegames]);

    return (
        <div className="container sbobet mobile">
            <Lobbynavbar pageTitle="sbobet mobile version" linkurldekstop={game?.dekstopurl} versimobilestatus={game?.versimobile} />
            <div className="secgames">
                {isLoading ? (
                    renderSkeletonone()
                ) : (
                    <div className="groupsbobetmobile">
                        <object data={dataIframe} type=""></object>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LobbyGamesMobilePage;
