"use client"
import { useEffect, useState, useMemo } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { toast } from "./ui/use-toast"
import { Slider } from "antd"
import type { SliderSingleProps } from "antd"
import { Input } from "./ui/input"
import { 
  useAccount, 
  useContractRead, 
  useContractWrite, 
  useWaitForTransaction, 
  useContract
} from '@starknet-react/core';
import StarkSwirlAbi from '@/abi/StarkSwirlABI.json';

const FormSchema = z.object({
  token: z.string().nonempty("Select a token to connect"),
})


export default function TokenSelect() {
  const [commitment, setCommitment] = useState<string>("");
  const [peaks, setPeaks] = useState<bigint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const contractAddress = process.env.NEXT_PUBLIC_STARK_SWIRL_CONTRACT_ADDRESS || '';

  const {contract: starkSwirlContract} = useContract({
    abi: StarkSwirlAbi,
    address: contractAddress,
  });
  
  const calls = useMemo(() => {
    if (!commitment || !starkSwirlContract) return [];
    return starkSwirlContract.populateTransaction['deposit'](commitment, peaks);
  }, [starkSwirlContract, commitment, peaks]);

  const { 
    writeAsync: deposit, 
    data: depositTxHash,
    error: depositError,
    isPending: isDepositPending,
    isSuccess: isDepositSuccess,
  } = useContractWrite({
    calls,
  });

  const depositHash = depositTxHash?.transaction_hash;

  const { status: depositStatus } = useWaitForTransaction({ hash: depositHash });

const handleDeposit = async (commitment: string) => {
  try{
    if (commitment) {
      await deposit();
    }
  } catch (error) {
    console.error(error);
  }finally{
    console.log("commitment: ",commitment)
    console.log("isDepositPending: ",isDepositPending)
    console.log("isDepositSuccess: ",isDepositSuccess)
    console.log("depositTxHash: ",depositTxHash)
    console.log("depositError: ",depositError)
    console.log("depositHash: ",depositHash)
    console.log("depositStatus: ",depositStatus)
  }};

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

   function handleUpload() {
    setLoading(true);
    setTimeout(() => {
      alert("Document uploaded!");
      setLoading(false);
    }, 2000); // Simulate the upload process
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 select-none relative"
      >
        <Input type='file' className="border-primary" onChange={(e)=> setCommitment(e.target.value)} value={commitment} placeholder="commitment"/>
        <button onClick={() => handleUpload()}
                className="flex w-full h-10 mt-5 bg-primary justify-center items-center text-center hover:bg-rose-700 transition-all hover:shadow-md hover:shadow-black duration-75 active:bg-primary active:translate-x-0.5 active:translate-y-0.5"
                type="button"
        >
                {loading ? "Checking PPI in the document..." : "Upload"}
              </button>
      </form>
    </Form>
  )
}
