"use client"

import React, { useState } from "react"
import { Input } from "./ui/input"
import InformationIcon from "@/lib/icons/informationIcon"
import { zodResolver } from "@hookform/resolvers/zod"
import TokenSelect from "./TokenSelect"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  noteInput: z.string(),
  addressInput: z.string(),
})

type FormFields = z.infer<typeof schema>

export default function InteractionCard() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  const [tabIndex, setTabIndex] = useState<number>(1)
  const onSubmit: SubmitHandler<FormFields> = (data) => console.log(data)

  // Two children lists, first child list with content cut after and last child with content cut before
  return (
    <div className="tabs flex flex-col w-full">
      <nav className="min-h-14 mb-0 pb-0">
        <ul className="flex items-center justify-between flex-grow-1 flex-shrink-0">
          <li className="m-0 p-0">
            <a
              onClick={() => setTabIndex(1)}
              className={
                tabIndex === 1
                  ? "active flex select-none justify-center rounded-tl-md items-center relative mr-7 m-0 pr-7 border bg-primary border-primary border-solid cursor-pointer"
                  : "flex justify-center select-none rounded-tl-md items-center relative mr-7 m-0 pr-7 border  border-primary border-solid cursor-pointer hover:bg-primary"
              }
              style={{ fontSize: "1.35rem" }}
            >
              <span>Deposit</span>
            </a>
          </li>
          <li className="m-0 p-0 ">
            <a
              onClick={() => setTabIndex(2)}
              className={
                tabIndex === 2
                  ? "active flex select-none justify-center rounded-tr-md items-center relative ml-7 m-0 pl-7 border border-primary bg-primary border-solid cursor-pointer"
                  : "flex justify-center select-none items-center rounded-tr-md relative ml-7 m-0 pl-7 border border-primary border-solid cursor-pointer hover:bg-primary"
              }
              style={{ fontSize: "1.35rem" }}
            >
              <span>Withdraw</span>
            </a>
          </li>
        </ul>
      </nav>
      <section
        className="flex mt-0 flex-col bg-dark rounded-b-md h-full border border-primary border-solid"
        style={{ padding: "1.5rem 1.5rem 2rem" }}
      >
        <div className={tabIndex === 1 ? "content active-content" : "content"}>
          <TokenSelect />
        </div>
        <div className={tabIndex === 2 ? "content active-content" : "content"}>
          <div className="flex">
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex select-none flex-row gap-3 mb-3">
                Note
                <button className="cursor-pointer hover:bg-red-400 hover:rounded-lg transition-all">
                  <InformationIcon />
                </button>
              </div>
              <div className="flex flex-col gap-9">
                <Input
                  placeholder="Please enter your note"
                  {...register("noteInput")}
                />
                <Input
                  placeholder="Please paste adress here"
                  {...register("addressInput")}
                />
              </div>
              <button
                className="flex w-full select-none h-10 mt-5 bg-primary justify-center items-center text-center hover:bg-rose-500 transition-all hover:shadow-md hover:shadow-black duration-75 active:bg-primary active:translate-x-0.5 active:translate-y-0.5"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? "Withdrawal in progress" : "Withdraw"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
