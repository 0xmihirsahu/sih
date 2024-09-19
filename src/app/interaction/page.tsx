"use client"

import React, { useState } from "react"
import NotificationTab from "@/components/NotificationTab"
import SecretGenerator from "@/components/SecretGenerator"
import ProofCard from "@/components/ProofCard"
import InformationIcon from "@/lib/icons/informationIcon"
import TokenSelect from "@/components/TokenSelect"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  noteInput: z.string(),
  addressInput: z.string(),
})

type FormFields = z.infer<typeof schema>

export default function InteractionPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  const [tabIndex, setTabIndex] = useState<number>(1)
  const onSubmit: SubmitHandler<FormFields> = (data) => console.log(data)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-24 md:p-24">
      <NotificationTab />
      <div
        className="page-content flex flex-row gap-20 items-center justify-center container w-full "
        style={{ maxWidth: "960px" }}
      >
        <div className="interactioncard-section flex flex-row w-2/4 h-56 mt-20">
          <div className="tabs flex flex-col w-full">
            <nav className="min-h-14 mb-0 pb-0">
              <ul className="flex items-center justify-center flex-grow-1 flex-shrink-0">
                <li className="m-0 p-0">
                  <a
                    onClick={() => setTabIndex(1)}
                    className={
                      tabIndex === 1
                        ? "active flex select-none justify-center rounded-tl-md items-center relative mr-1 m-0 w-48 pr-7 border bg-primary border-primary border-solid cursor-pointer"
                        : "flex justify-center select-none rounded-tl-md items-center relative mr-1 m-0 pr-7 w-48  border  border-primary border-solid cursor-pointer hover:bg-primary"
                    }
                    style={{ fontSize: "1.35rem" }}
                  >
                    <span>Upload</span>
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
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
