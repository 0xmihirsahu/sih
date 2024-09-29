"use client"
import { useEffect, useRef, useState } from "react"
import { useConnect, useAccount } from "@starknet-react/core"
import useTheme from "../hooks/useTheme"
import ThemeSwitch from "./Theme"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation";

const Header = () => {
  const { address } = useAccount()
  const { connect, connectors } = useConnect()
  const [openConnectModal, setOpenConnectModal] = useState(false)
  const [openConnectedModal, setOpenConnectedModal] = useState(false)
  const [isTransactionModalOpen, setIsModalTransactionOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const pathname = usePathname();

  const toggleModal = () => {
    setOpenConnectModal((prev) => !prev)
  }

  const toggleMenu = () => {
    setOpenMenu((prev) => !prev)
  }

  const toggleUserModal = () => {
    setOpenConnectedModal((prev) => !prev)
  }

  const handleOpenTransactionListClick = () => {
    setIsModalTransactionOpen(true)
  }

  const handleCloseTransactionListClick = () => {
    setIsModalTransactionOpen(false)
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggleModal()
      }
    }
    document.body.addEventListener("keydown", closeOnEscapeKey)
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey)
    }
  }, [])

  useEffect(() => {
    const lastUsedConnector = localStorage.getItem("lastUsedConnector")
    if (lastUsedConnector) {
      connect({
        connector: connectors.find(
          (connector) => connector.name === lastUsedConnector
        ),
      })
    }
  }, [connectors]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (openConnectModal) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [openConnectModal])

  const { theme, changeTheme } = useTheme()

  return (
    <>
      <header
        ref={dropdownRef}
        className=" w-full fixed backdrop-blur-2xl dark:border-neutral-800 lg:bg-gray-200 lg:dark:bg-zinc-800/50 left-0 top-0 flex flex-wrap gap-4 py-2 px-4 md:py-4 md:px-10 z-30 justify-center items-center text-center"
      >
        <div className="flex flex-row" style={{ maxWidth: "1000px" }}>
          <div className="">
            <Image
              src="/starkswirllogo.svg"
              alt="StarkSwirl Logo"
              width={40}
              height={40}
            />
          </div>
          <span className="mr-96">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 40"
              width="200"
              height="40"
              className="md:text-[1.2em]"
            >
              <Link href="/">
                <text
                  x="10"
                  y="30"
                  fontFamily="Cursive, sans-serif"
                  fill={`${theme === "dark" ? "white" : "black"}`}
                >
                  Pryvate
                </text>
              </Link>
            </svg>
          </span>
          <div className="hidden md:flex gap-8">
            <div className={`flex items-center gap-4 text-lg font-bold rounded-lg px-4 py-0 hover:text-primary ${pathname === "/interaction" ? "underline decoration-primary underline-offset-3 font-black bg-zinc-900": ""} hover:bg-zinc-900`}>
              <Link href="/interaction">App</Link>
            </div>

            <ThemeSwitch
              className="flex md:hidden lg:hidden sm:hidden dark:transform-none transform dark:translate-none transition-all duration-500 ease-in-out"
              action={changeTheme}
              theme={theme}
              openMenu={openMenu}
            />
          </div>

          <div className="flex items-center md:hidden gap-8">
            <ThemeSwitch
              className="flex md:hidden dark:transform-none transform dark:translate-none transition-all duration-500 ease-in-out"
              action={changeTheme}
              theme={theme}
              openMenu={openMenu}
            />

            <button
              title="toggle menu"
              onClick={toggleMenu}
              className="flex flex-col gap-2 md:hidden"
            >
              <div
                className={`w-[1.5em] h-[2px] ${
                  theme === "dark" ? "bg-[#ffffff]" : "bg-[#000000]"
                } rounded-full transition-all duration-300 ease-in-out ${
                  openMenu
                    ? "rotate-45 translate-y-[0.625em]"
                    : "rotate-0 translate-y-0"
                }`}
              ></div>
              <div
                className={`w-[1.5em] h-[2px] ${
                  theme === "dark" ? "bg-[#ffffff]" : "bg-[#000000]"
                } rounded-full transition-all duration-300 ease-in-out ${
                  openMenu ? "opacity-0" : "opacity-100"
                }`}
              ></div>
              <div
                className={`w-[1.5em] h-[2px] ${
                  theme === "dark" ? "bg-[#ffffff]" : "bg-[#000000]"
                } rounded-full transition-all duration-300 ease-in-out ${
                  openMenu
                    ? "-rotate-45 translate-y-[-0.625em]"
                    : "rotate-0 translate-y-0"
                }`}
              ></div>
            </button>
          </div>

          <div
            className={`w-screen  transition-all duration-300 ease-in-out grid ${
              openMenu
                ? "min-h-[4rem] grid-rows-[1fr]  opacity-100"
                : "grid-rows-[0fr]  opacity-0"
            }  md:hidden`}
          >
            <div className="overflow-hidden">
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
