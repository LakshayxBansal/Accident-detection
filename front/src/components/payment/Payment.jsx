import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

import { Input } from "@/components/ui/input"


import { 
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
 } from '../ui/card'

 import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const Payment = () => {

  const navigate = useNavigate();
  return (

    <Card className="max-w-md mx-auto mt-11 w-2/3 p-6 shadow-lg rounded-2xl">
            <CardHeader>
              <CardTitle className="text-left mb-2">Payment Method</CardTitle>
              <CardDescription className="text-left">Add a new payment method to your account</CardDescription>
            </CardHeader>

            <div className='justify-center flex space-x-14 w-full mb-5 '>
                <CardContent className="border border-zinc-950 w-28 hover:bg-zinc-200 hover:cursor-pointer dark:border-gray-500 rounded-xl">
                    <FontAwesomeIcon icon={faCreditCard} className="text-gray-700 pt-5" size="2x" />
                    <CardDescription className="font-semibold pt-2">Card</CardDescription>
                </CardContent>
                <CardContent className="border border-zinc-950 w-28 hover:bg-zinc-200 hover:cursor-pointer dark:border-gray-500 rounded-xl">
                    <FontAwesomeIcon icon={faPaypal} className="text-blue-600 pt-5 " size="2x" />
                    <CardDescription className="font-semibold pt-2">Paypal</CardDescription>
                </CardContent>
            </div>

            <CardContent>
                <p className='text-left'>Name</p>
                <Input placeholder="First Last" className="mt-2 rounded-r-xl rounded-l-xl"/>
            </CardContent>

            <CardContent>
                <p className='text-left'>City</p>
                <Input placeholder="First Last" className="mt-2 rounded-r-xl rounded-l-xl"/>
            </CardContent>

            <CardContent>
                <p className='text-left'>Card number</p>
                <Input placeholder="First Last" className="mt-2 rounded-r-xl rounded-l-xl"/>
            </CardContent>

            <CardContent className="flex justify-center">
                <CardContent className="w-auto">
                    <p className='text-left'>Expires</p>
                    <Select>
                        <SelectTrigger className="mt-2 p-1 rounded-r-xl rounded-l-xl">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectItem value="apple">January</SelectItem>
                            <SelectItem value="banana">February</SelectItem>
                            <SelectItem value="blueberry">March</SelectItem>
                            <SelectItem value="grapes">April</SelectItem>
                            <SelectItem value="pineapple">May</SelectItem>
                            <SelectItem value="pineapple">June</SelectItem>
                            <SelectItem value="pineapple">July</SelectItem>
                            <SelectItem value="pineapple">August</SelectItem>
                            <SelectItem value="pineapple">September</SelectItem>
                            <SelectItem value="pineapple">October</SelectItem>
                            <SelectItem value="pineapple">November</SelectItem>
                            <SelectItem value="pineapple">December</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardContent>

                <CardContent>
                    <p className='text-left'>Year</p>
                    <Select>
                        <SelectTrigger className="mt-2 rounded-r-xl rounded-l-xl">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectItem value="apple">2024</SelectItem>
                            <SelectItem value="banana">2025</SelectItem>
                            <SelectItem value="blueberry">2026</SelectItem>
                            <SelectItem value="grapes">2027</SelectItem>
                            <SelectItem value="pineapple">2028</SelectItem>
                            <SelectItem value="pineapple">2029</SelectItem>
                            <SelectItem value="pineapple">2030</SelectItem>
                            <SelectItem value="pineapple">2031</SelectItem>
                            <SelectItem value="pineapple">2032</SelectItem>
                            <SelectItem value="pineapple">2033</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardContent>
                
                <CardContent>
                    <p className='text-left'>CVC</p>
                    <Input placeholder="CVC" className="mt-2 rounded-r-xl rounded-l-xl"/>
                </CardContent>
            </CardContent>
            
            <CardContent>
                <Button className="size-full rounded-r-xl rounded-l-xl">Continue</Button>
            </CardContent>
          </Card>

  )
}

export default Payment;
