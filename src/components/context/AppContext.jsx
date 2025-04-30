import { Avatar, Flex, Text, useToast } from "@chakra-ui/react";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { decrypt, encrypt } from "../utils/security";

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

    const [employee, setEmployee] = useState([]);
    const fetchAllEmployee = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${APP_URL}/employee/getAllEmployee`, {
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
    const all_employees = [
        ...employee.map((c, index) => ({
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

     const [productService, setProductService] = useState([]);
    
        const fetchProductService = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product_service/get_all_product`, {
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

       
          
          const[sectors,setSectors]=useState([])

          const fetchSector= async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/sector/get_all_sector`, {
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

        const[campaign,setCampaign]=useState([])

        const fetchCampaign= async () => {
          try {
              const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/campaign/getAllCampaign`, {
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
         
        const user=localStorage.getItem('user')
        const admin_id=decrypt(user).id
        // console.log(adminId,"fdffs");
        
    return (
        <AppContext.Provider
            value={{
                showAlert, loading,
                fetchAllEmployee, employee,admin_id,
                fetchAllQueries, queries, formatDate, fetchAllUser, users, all_employees, APP_URL,
                clearChat, setClearChat, username, setUsername, logout,productService
                ,fetchProductService,sectors,fetchSector, fetchCampaign, campaign
            }}
        >
            {children}
        </AppContext.Provider>
    )

}