import React from 'react'
import { 
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
 } from '../ui/card'
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const UpgradePlan = () => {

  const navigate = useNavigate();
  return (
    <div>
      <div className='flex font-bold text-3xl justify-center mt-12'>
        Upgrade Your Plan
      </div>
      <div className='flex justify-center space-x-9 mt-16 h-48'>
        <div>
          <Card className="max-w-md mx-auto p-6 shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-left mb-2">Free</CardTitle>
              <CardDescription className="text-left">$0 USD</CardDescription>
              <CardDescription className="text-left">Explore how AI can help you with everyday tasks</CardDescription>
            </CardHeader>

            <CardContent>
                <Button className="cursor-not-allowed size-full rounded-l-full rounded-r-full mt-3"
                disabled = {true}>
                  Your current plan
                </Button>
            </CardContent>
            <CardContent className="flex space-x-2 text-left">
              <div><p>✔️</p></div>
              <div>
                <p>You will be our priority unless others pay more</p>
              </div>
            </CardContent>

            <CardContent className="flex space-x-2 text-left">
              <div><p>✔️</p></div>
              <div>
                <p>You will be our priority unless others pay more</p>
              </div>
            </CardContent>

            <CardContent className="flex space-x-2 text-left">
              <div><p>✔️</p></div>
              <div>
                <p>You will be our priority unless others pay more</p>
              </div>
            </CardContent>
            
            <CardFooter className="text-xs mt-5 justify-center text-white-400 p-4 rounded-b-lg border-t-2 border-slate-500">
              <p className='text-center italic'>Free version it is</p>
            </CardFooter>
          </Card>
        </div>

        <div >
          <Card className="max-w-md mx-auto p-6 shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-left mb-2">Monthly Plan</CardTitle>
              <CardDescription className="text-left">$20 / month</CardDescription>
              <CardDescription className="text-left">Explore how AI can help you with everyday tasks</CardDescription>
            </CardHeader>

            <CardContent>
              <Button onClick={() => {navigate("/")}} className="cursor-pointer size-full rounded-l-full rounded-r-full mt-3 bg-green-500 hover:bg-green-600"  disabled = {false}>
                Upgrade to Plus
              </Button>
            </CardContent>


            <CardContent className="flex space-x-2 text-left">
              <div><p>✔️</p></div>
              <div>
                <p>You will be our priority unless others pay more.</p>
              </div>
            </CardContent>

            <CardContent className="flex space-x-2 text-left">
              <div><p>✔️</p></div>
              <div>
                <p>You will be our priority unless others pay more</p>
              </div>
            </CardContent>

            <CardContent className="flex space-x-2 text-left">
              <div><p>✔️</p></div>
              <div>
                <p>You will be our priority unless others pay more</p>
              </div>
            </CardContent>
            
            {/* <CardFooter className="text-xs mt-5 justify-center text-green-400">
              <p>Because it's capitalism bitch</p>
            </CardFooter> */}
            <CardFooter className="text-xs mt-5 justify-center text-black dark:text-white p-4 rounded-b-lg border-t-2 border-slate-500">
              <p className="text-center italic">Because it's capitalism</p>
            </CardFooter>

          </Card>
        </div>

        <div >
          <Card className="max-w-md mx-auto p-6 shadow-lg rounded-lg">
            <CardHeader>
              <CardTitle className="text-left mb-2">Annual Plan</CardTitle>
              <CardDescription className="text-left">$200 yearly</CardDescription>
              <CardDescription className="text-left ">Explore how AI can help you with everyday tasks</CardDescription>
            </CardHeader>

            <CardContent>
              <Button onClick={() => {navigate("/")}} className="cursor-pointer size-full rounded-l-full rounded-r-full mt-3 bg-green-500 hover:bg-green-600"  disabled = {false}>
                Upgrade to Plus
              </Button>
            </CardContent>


            <CardContent className="flex space-x-2 text-left">
              <div><p>✔️</p></div>
              <div>
                <p>You will be our priority unless others pay more.</p>
              </div>
            </CardContent>

            <CardContent className="flex space-x-2 text-left">
              <div><p>✔️</p></div>
              <div>
                <p>You will be our priority unless others pay more</p>
              </div>
            </CardContent>

            <CardContent className="flex space-x-2 text-left">
              <div><p>✔️</p></div>
              <div>
                <p>You will be our priority unless others pay more</p>
              </div>
            </CardContent>
            
            {/* <CardFooter className="text-xs mt-5 justify-center text-green-400">
              <p>Because it's capitalism bitch</p>
            </CardFooter> */}
            <CardFooter className="text-xs mt-5 justify-center text-black dark:text-white p-4 rounded-b-lg border-t-2 border-slate-500">
              <p className="text-center italic">You're Premium member</p>
            </CardFooter>

          </Card>
        </div>
      </div>
    </div>
  )
}

export default UpgradePlan;
