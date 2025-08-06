import { Avatar, Flex, Text, useDisclosure, useToast } from "@chakra-ui/react";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { decrypt, encrypt } from "../utils/security";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const APP_URL = import.meta.env.VITE_BACKEND_URL

export const AppProvider = ({ children }) => {

    const token = localStorage.getItem('token');

    const [clearChat, setClearChat] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem("username") || "");

    useEffect(() => {
        localStorage.setItem("username", username);
    }, [username]);

    const user = useMemo(() => {
        const users = localStorage?.getItem('user');
        if (users) {
            return JSON.parse(users)
        }
    }, [])

    const logout = () => {
        setUsername("");  // Clear username from state
        localStorage.removeItem("username"); // Remove username from localStorage
        localStorage.removeItem('token');
    };


    const toast = useToast();
    const statusMap = {
        success: "success",
        danger: "error",
        warning: "warning",
        info: "info"
    };
    const showAlert = useCallback((message, type) => {
        toast({
            title: message,
            status: statusMap[type] || "error",
            duration: 4000,
            isClosable: true,
            position: 'top'
        })
    }, [])

    function formatDate(dateInput, isFriendly = false) {
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) {
            return null;
        }

        if (isFriendly) {
            const now = new Date();
            const diffInSeconds = Math.floor((now - date) / 1000);

            if (diffInSeconds < 60) {
                return `${diffInSeconds}s ago`;
            }

            const diffInMinutes = Math.floor(diffInSeconds / 60);
            if (diffInMinutes < 60) {
                return diffInMinutes === 1 ? '1m ago' : `${diffInMinutes}m ago`;
            }

            const diffInHours = Math.floor(diffInMinutes / 60);
            if (diffInHours < 24) {
                return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
            }

            const diffInDays = Math.floor(diffInHours / 24);
            if (diffInDays < 30) {
                return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
            }

            const diffInMonths = Math.floor(diffInDays / 30);
            if (diffInMonths < 12) {
                return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
            }

            const diffInYears = Math.floor(diffInMonths / 12);
            return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
        } else {
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const day = date.getUTCDate().toString().padStart(2, '0');
            const month = months[date.getUTCMonth()];
            const year = date.getUTCFullYear();
            return `${day} ${month} ${year}`;
        }
    }



    const [loading, setLoading] = useState(false)

    const [employee, setEmployee] = useState([]); // add
    const fetchAllEmployee = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${APP_URL}/admin/getAllEmployee`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                }
            })
            const result = await response.json();
            if (result.success) {
                setEmployee(result.data)
            } else {
                showAlert(result.error, "error")
            }
        } catch (error) {
            console.log(error);
            showAlert("Internal Server Error!", "error")
        }
    }

    const [queries, setQueries] = useState([]);
    const fetchAllQueries = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${APP_URL}/support/getAllQueries`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                }
            })
            const result = await response.json();
            // console.log(result)
            if (result.success) {
                // console.log(result.data)
                setQueries(result.data)
            } else {
                showAlert(result.error, "error")
            }
        } catch (error) {
            console.log(error);
            showAlert("Internal Server Error!", "error")
        }
    }

    const [users, setUsers] = useState([]);

    const fetchAllUser = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${APP_URL}/user/getAllUser`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                }
            })
            const result = await response.json();
            // console.log(result)
            if (result.success) {
                // console.log(result.data)
                setUsers(result.data)
            } else {
                showAlert(result.error, "error")
            }
        } catch (error) {
            console.log(error);
            showAlert("Internal Server Error!", "error")
        }
    }

    const [employees, setEmployees] = useState([]);

    const fetchAllEmployees = async (admin_id) => {
        try {
            setLoading(true)
            const response = await fetch(`${APP_URL}/employee/getAllEmployee?admin_id=${admin_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,

                }
            })
            const result = await response.json();

            if (result.success) {
                setEmployees(result.data)
            } else {
                showAlert(result.error, "error")
            }
        } catch (error) {
            console.log(error);
            showAlert("Internal Server Error!", "error")
        }
    }

    const [employeesQuery, setEmployeeQuery] = useState([]);

    const fetchAllEmployeeQuery = async (id) => {
        try {
            setLoading(true)
            const response = await fetch(`${APP_URL}/employee/getAllEmployeeQUery?admin_id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                }
            })
            const result = await response.json();

            if (result.success) {
                setEmployeeQuery(result.data)
            } else {
                showAlert(result.error, "error")
            }
        } catch (error) {
            console.log(error);
            showAlert("Internal Server Error!", "error")
        }
    }
    const all_employees = [
        ...employeesQuery.map((c, index) => ({
            label: (
                <Flex key={index} alignItems={'center'} gap={2}>
                    <Avatar size='xs' name={c.name} />
                    <Text
                        borderRadius="var(--radius)"
                        fontSize="var(--mini-text)"
                        fontWeight="var(--big-font-weight)"
                    >
                        {c.name}
                    </Text>
                </Flex>
            ),
            value: c.id,
            value1: c.name,
        })),
    ];

    const [productService, setProductService] = useState([]);

    const fetchProductService = async (admin_id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product_service/get_all_product?admin_id=${admin_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: token
                },

            })
            const result = await response.json();

            setProductService(result.product)

        } catch (error) {
            console.log(error)
            showAlert('Internal server error', 'error')
        }
    }

    const [sectors, setSectors] = useState([])

    const fetchSector = async (admin_id) => {
        // console.log(admin_id)
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sector/get_all_sector?admin_id=${admin_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: token
                },

            })
            const result = await response.json();
            // console.log("result ", result.formattedData)
            setSectors(result.formattedData)

        } catch (error) {
            console.log(error)
            showAlert('Internal server error', 'error')
        }
    }

    const [campaign, setCampaign] = useState([])

    const fetchCampaign = async (admin_id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/campaign/getAllCampaign?admin_id=${admin_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: token
                },

            })
            const result = await response.json();

            setCampaign(result.data)

        } catch (error) {
            console.log(error)
            showAlert('Internal server error', 'error')
        }
    }

    const [bots, setBots] = useState([])

    const fetchBot = async (admin_id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bots/getAll?admin_id=${admin_id}`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    // Authorization: token
                },

            })
            const result = await response.json();
            //    console.log("bot",result.data)
            setBots(result.data)

        } catch (error) {
            console.log(error)
            showAlert('Internal server error', 'error')
        }
    }

    const [template, setTemplate] = useState([])

    const fetchTemplate = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/template/get_all_template?admin_id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: token
                },
            })
            const result = await response.json();

            setTemplate(result?.data || [])
        } catch (error) {
            console.log(error)
            setTemplate([])
            showAlert('Internal server error', 'error')
        }
    }

    const [linkedBots, setLinkedBots] = useState([])
    const fetchLinkedBots = async (id) => {
        try {
            const data = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sector/get_linked_bot?sector_id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }

            })
            const result = await data.json();
            setLinkedBots(result?.data?.bots);
        } catch (error) {
            console.log(error)
        }
    }

    const [products, setProducts] = useState([]);
    const getProducts = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }

            const response = await axios.get(
                `${APP_URL}/sector/get_all_product_sector?sector_id=${id}`,
                {
                    headers: { Authorization: `${token}` },
                }
            );

            setProducts(response.data.data);
        } catch (err) {
            console.error("Failed to fetch sector data", err);
        }
    };

    const [sector, setSector] = useState({});


    const sectorData = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            const response = await axios.get(`${APP_URL}/sector/sectort_by_id?sector_id=${id}`, {
                headers: { Authorization: `${token}` },
            });
            setSector(response.data.data);

        } catch (err) {
            console.error("Failed to fetch sector data");
        }
    };

    const [phoneNumbers, setPhoneNumbers] = useState([]);

    const getAllNumbers = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bots/getPhone_numbers`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const result = await response.json();
            setPhoneNumbers(result.data)

            // console.log("allnum", result.data?.phone_number)
        } catch (error) {
            console.log(error)
        }
    }

    function timeAgo(dateString) {
        const now = new Date();
        const past = new Date(dateString);
        const diffMs = now - past;

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
        if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
        if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
        return `${days} day${days !== 1 ? "s" : ""} ago`;
    }

    const [genBotforEmployee, setGenBotforEmployee] = useState([]);
    const getGenBotforEmployee = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employee/getAllAssignGenerativeBots?employee_id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`
                }
            })
            const result = await response.json();
            setGenBotforEmployee(result.data)

            // console.log("allnum", result.data?.phone_number)
        } catch (error) {
            console.log(error)
        }
    }

    const [algBotforEmployee, setAlgBotforEmployee] = useState([]);
    const getAlgBotforEmployee = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employee/getAllAssignBots?employee_id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`
                }
            })
            const result = await response.json();
            setAlgBotforEmployee(result.data)

            // console.log("allnum", result.data?.phone_number)
        } catch (error) {
            console.log(error)
        }
    }
    const [employeeId, setEmployeeId] = useState({});
    const getEmployeeId = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/employee/getEmployeeId?user_id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`
                }
            })
            const result = await response.json();
            setEmployeeId(result.data)

            // console.log("allnum", result.data?.phone_number)
        } catch (error) {
            console.log(error)
        }
    }
    const [botSector, setBotSector] = useState([])
    const getAllinSector = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bots/getAllbotSector?sector_id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    // Authorization: token
                },

            })
            const result = await response.json();
            //    console.log("bot",result.data)
            setBotSector(result.data)

        } catch (error) {
            console.log(error)
            showAlert('Internal server error', 'error')
        }
    }
    const [botDeletebot, setDeleteBot] = useState([])
    const getAlldeletebot = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bots/getAlldeletebot?admin_id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    // Authorization: token
                },

            })
            const result = await response.json();
            //    console.log("bot",result.data)
            setDeleteBot(result.data)

        } catch (error) {
            console.log(error)
            showAlert('Internal server error', 'error')
        }
    }

    const [deleteProduct, setDeleteProduct] = useState([])
    const getAllDeleteProduct = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product_service/allDeletedProduct`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    // Authorization: token
                },

            })
            const result = await response.json();
            //    console.log("bot",result.data)
            setDeleteProduct(result.data)

        } catch (error) {
            console.log(error)
            showAlert('Internal server error', 'error')
        }
    }

    const [sectorBots, setSectorBots] = useState([]);
    const [sectorGenAi, setSectorGenAi] = useState([]);
    const fetchSectorBots = async (admin_id) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/sectorNumberWiseBots?admin_id=${admin_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            const response = await res.json();
            setSectorBots(response.data)
            setSectorGenAi(response.generativeData)
        } catch (error) {
            console.log(error)
        }
    }

    const [metrics, setMetrics] = useState({ activeBots: 0, campaignsSent: 0 });
    const fetchMetrics = useCallback(async (admin_id) => {
        if (!token) {
            console.warn("Missing token, skipping metrics fetch");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/admin/getAdminCount?admin_id=${admin_id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    },
                }
            );

            const result = await res.json();

            if (result?.success) {
                const activeBots = result.data?.activeBots ?? 0;
                const campaignsSent = result.data?.campaignsSent ?? 0;
                setMetrics({ activeBots, campaignsSent });
            } else {
                console.error('API error:', result?.error || 'Unknown error');
            }
        } catch (err) {
            console.error('Fetch error:', err.message || err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const [months, setMonths] = useState([]);
    const [botData, setBotData] = useState([]);
    const [campaignData, setCampaignData] = useState([]);

    const fetchMonthlyMetrics = async () => {
        try {
            if (!token) {
                console.error('No token found in localStorage.');
                return;
            }

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/admin/getMonthlyMetrics`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                }
            );

            const { success, data, error } = await response.json();

            if (!success) {
                console.error('API Error:', error);
                return;
            }

            const { botsByMonth = [], campaignsByMonth = [] } = data;

            const allMonths = Array.from(
                new Set([...botsByMonth, ...campaignsByMonth].map(item => item.month))
            ).sort();

            const botMap = new Map(botsByMonth.map(({ month, count }) => [month, count]));
            const campaignMap = new Map(campaignsByMonth.map(({ month, count }) => [month, count]));

            const botSeries = allMonths.map(month => botMap.get(month) || 0);
            const campaignSeries = allMonths.map(month => campaignMap.get(month) || 0);

            setMonths(allMonths);
            setBotData(botSeries);
            setCampaignData(campaignSeries);

        } catch (error) {
            console.error('Error fetching monthly metrics:', error);
        } finally {
            setLoading(false);
        }
    };

    const [botcampaigns, setBotcampaigns] = useState([])
    const getbotcampaigns = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/botcampaigns-by-clicks`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    // Authorization: token
                },
            })
            const result = await response.json();
            setBotcampaigns(result.data)

        } catch (error) {
            console.log(error)
            showAlert('Internal server error', 'error')
        }
    }

    const [activeUser, setActiveUser] = useState({ daily: [], monthly: [] })
    const getActiveUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/getActiveUser`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: token
                },
            })
            const result = await response.json();
            // console.log(result)
            setActiveUser({ daily: result.daily, monthly: result.monthly })

        } catch (error) {
            console.log(error)
            showAlert('Internal server error', 'error')
        }
    }

    const startNewChat = (navigate, userId) => {
        navigate(`/${userId}`);
        // console.log("this is clicking");

    };

    const [allQuestions, setAllQuestions] = useState([])
    const fetchAllQuestions = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${APP_URL}/community/get-all-question`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                }
            })
            const result = await response.json();
            if (result.success) {
                setAllQuestions(result.data)
            } else {
                showAlert(result.error, "error")
            }
        } catch (error) {
            console.log(error);
            showAlert("Internal Server Error!", "error")
        }
    }

    const { isOpen: isQuestionOpen, onClose: onQuestionClose, onOpen: onQuestionOpen } = useDisclosure();


    return (
        <AppContext.Provider
            value={{
                getbotcampaigns, botcampaigns, getActiveUser, activeUser, user,
                fetchMetrics, metrics, months, botData, campaignData, fetchMonthlyMetrics,
                deleteProduct, getAllDeleteProduct, setDeleteProduct, fetchSectorBots, sectorBots, sectorGenAi,
                getEmployeeId, employeeId, botSector, getAllinSector, botDeletebot, getAlldeletebot,
                getGenBotforEmployee, genBotforEmployee, getAlgBotforEmployee, algBotforEmployee,
                showAlert, loading, fetchLinkedBots, linkedBots, getProducts, products, sectorData, sector,
                fetchAllEmployees, employees, timeAgo,
                fetchAllEmployee, employee,
                fetchAllQueries, queries, formatDate, fetchAllUser, users, all_employees, APP_URL,
                clearChat, setClearChat, username, setUsername, logout, productService
                , fetchProductService, sectors, fetchSector, fetchCampaign, campaign, fetchAllEmployeeQuery, bots, fetchBot,
                fetchTemplate, template, getAllNumbers, phoneNumbers,
                startNewChat,
                fetchAllQuestions, allQuestions,
                isQuestionOpen, onQuestionClose, onQuestionOpen
            }}
        >
            {children}
        </AppContext.Provider>
    )

}