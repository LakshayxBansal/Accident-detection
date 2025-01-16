import React from "react";
//import { calsans } from "@/fonts/calsans";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "../components/ui/tracing-beam";

// const Installation = ()=>{
//   return (
//     (<TracingBeam className="px-6">
//       <div className="max-w-2xl mx-auto antialiased pt-4 relative">
//         {dummyContent.map((item, index) => (
//           <div key={`content-${index}`} className="mb-10">
//             <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
//               {item.badge}
//             </h2>

//             <p className={twMerge(calsans.className, "text-xl mb-4")}>
//               {item.title}
//             </p>

//             <div className="text-sm  prose prose-sm dark:prose-invert">
//               {item?.image && (
//                 <img
//                   src={item.image}
//                   alt="blog thumbnail"
//                   height="1000"
//                   width="1000"
//                   className="rounded-lg mb-10 object-cover" />
//               )}
//               {item.description}
//             </div>
//           </div>
//         ))}
//       </div>
//     </TracingBeam>)
//   );
// }

const Installation = () => {
    return (
      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          {dummyContent.map((item, index) => (
            <div key={`content-${index}`} className="mb-10">
              <h2 className="bg-black text-white dark:bg-cyan-300 dark:text-black rounded-full text-sm w-fit px-4 py-1 mb-4">
                {item.badge}
              </h2>
  
              <p className={twMerge("font-roboto text-xl mb-4")}>
                {item.title}
              </p>
  
              <div className="text-sm prose prose-sm dark:prose-invert">
                {item?.image && (
                  <img
                    src={item.image}
                    alt="blog thumbnail"
                    height="1000"
                    width="1000"
                    className="rounded-lg mb-10 object-cover" />
                )}
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    );
  };
  

const dummyContent = [
  {
    title: "Register and Book Your Demo",
    description: (
      <>
        <p>
        Begin by creating an account on our website, abc.com. This will allow you to manage your system and receive updates. After registration, schedule a demo session to understand how the accident detection system works. During the demo, our team will walk you through the system’s features, including how it detects accidents, alerts emergency contacts, and shares your location with relevant parties. The demo ensures you’re fully informed and ready for the next steps.
        </p>
      </>
    ),
    badge: "Step 1",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Order and Receive Your Hardware",
    description: (
      <>
        <p>
        Once you've understood the system’s functionality, browse our website to select the hardware kit that suits your vehicle. After placing your order, you’ll receive a notification when the hardware is shipped to your address. The kit will include all necessary components: sensors, GPS tracker, installation tools, and an easy-to-follow manual. Once the package arrives, check to ensure all items are intact and ready for installation.
        </p>
      </>
    ),
    badge: "Step 2",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Install the Hardware",
    description: (
      <>
        <p>
        Follow the detailed installation instructions provided in the kit to securely install the hardware on your vehicle. The hardware needs to be correctly placed for optimal accident detection, including positioning the sensors and GPS tracker. While you can install the system yourself with the provided instructions, we also offer professional installation services for those who prefer assistance. After installation, power on the system to begin the activation process.
        </p>
      </>
    ),
    badge: "Step 3",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Link Your System and Start Using It",
    description: (
      <>
        <p>
        The final step is to link the hardware to your account on abc.com. Each hardware unit comes with a unique ID that you’ll enter into your account to sync it with your vehicle. Once linked, the system is ready to go live. In the event of an accident, the system will detect it, send alerts to your emergency contacts, and provide real-time GPS location data. You can monitor these alerts through your account and mobile app, ensuring you’re always connected for quick assistance.
        </p>
      </>
    ),
    badge: "Step 4",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }
];


export default Installation;