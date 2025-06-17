import { Avatar, Flex, Text, useToast } from "@chakra-ui/react";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { decrypt, encrypt } from "../utils/security";
import axios from "axios";

export const AppContext = createContext();

const APP_URL = import.meta.env.VITE_BACKEND_URL

export const AppProvider = ({ children }) => {

    const token = localStorage.getItem('token');

    const [clearChat, setClearChat] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem("username") || "");

    useEffect(() => {
        localStorage.setItem("username", username);
    }, [username]);

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

    function formatDate(dateInput) {
        const date = new Date(dateInput);

        if (isNaN(date.getTime())) {
            // console.error('Invalid date input');
            return null;
        }
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];


        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = months[date.getUTCMonth()];
        const year = date.getUTCFullYear();

        return `${day} ${month} ${year}`;
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

    const fetchAllEmployeeQuery = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${APP_URL}/employee/getAllEmployeeQUery`, {
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

    const fetchTemplate = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/template/get_all_template`, {
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
            // console.log(response.data.data);
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
    const  getAllinSector= async (id) => {
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
  const [botDeletebot, setDeleteBot ]= useState([])
    const  getAlldeletebot= async (id) => {
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

    const [deleteProduct, setDeleteProduct ]= useState([])
    const  getAllDeleteProduct= async () => {
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
    
    return (
        <AppContext.Provider
            value={{
                deleteProduct,getAllDeleteProduct,setDeleteProduct,
                getEmployeeId,employeeId,botSector,getAllinSector,botDeletebot,getAlldeletebot,
                getGenBotforEmployee, genBotforEmployee,getAlgBotforEmployee, algBotforEmployee,
                showAlert, loading, fetchLinkedBots, linkedBots, getProducts, products, sectorData, sector,
                fetchAllEmployees, employees, timeAgo,
                fetchAllEmployee, employee,
                fetchAllQueries, queries, formatDate, fetchAllUser, users, all_employees, APP_URL,
                clearChat, setClearChat, username, setUsername, logout, productService
                , fetchProductService, sectors, fetchSector, fetchCampaign, campaign, fetchAllEmployeeQuery, bots, fetchBot,
                fetchTemplate, template, getAllNumbers, phoneNumbers
            }}
        >
            {children}
        </AppContext.Provider>
    )

}