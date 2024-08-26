import Header from "./Header";
import HouseCard from "./HouseCard";

const Home = () => {
  const houseData = [
    {
      house_pic:
        "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Apr/29/Photo_h300_w450/72550691_4_hatsAppImage20240425at11.17.27AM1_300_450.jpeg",
      house_name: "4BHK",
      house_details: "4BHK house in Ahmedabad",
      house_address: "address",
      house_price: 20000,
      additional_details: "additional details of house",
    },
    {
      house_pic:
        "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Apr/29/Photo_h300_w450/72550691_4_hatsAppImage20240425at11.17.27AM1_300_450.jpeg",
      house_name: "4BHK",
      house_details: "4BHK house in Ahmedabad",
      house_address: "address",
      house_price: 20000,
      additional_details: "additional details of house",
    },
    {
      house_pic:
        "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Apr/29/Photo_h300_w450/72550691_4_hatsAppImage20240425at11.17.27AM1_300_450.jpeg",
      house_name: "4BHK",
      house_details: "4BHK house in Ahmedabad",
      house_address: "address",
      house_price: 20000,
      additional_details: "additional details of house",
    },
    {
      house_pic:
        "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Apr/29/Photo_h300_w450/72550691_4_hatsAppImage20240425at11.17.27AM1_300_450.jpeg",
      house_name: "4BHK",
      house_details: "4BHK house in Ahmedabad",
      house_address: "address",
      house_price: 20000,
      additional_details: "additional details of house",
    },
    {
      house_pic:
        "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Apr/29/Photo_h300_w450/72550691_4_hatsAppImage20240425at11.17.27AM1_300_450.jpeg",
      house_name: "4BHK",
      house_details: "4BHK house in Ahmedabad",
      house_address: "address",
      house_price: 20000,
      additional_details: "additional details of house",
    },
    {
      house_pic:
        "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Apr/29/Photo_h300_w450/72550691_4_hatsAppImage20240425at11.17.27AM1_300_450.jpeg",
      house_name: "4BHK",
      house_details: "4BHK house in Ahmedabad",
      house_address: "address",
      house_price: 20000,
      additional_details: "additional details of house",
    },
    {
      house_pic:
        "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Apr/29/Photo_h300_w450/72550691_4_hatsAppImage20240425at11.17.27AM1_300_450.jpeg",
      house_name: "4BHK",
      house_details: "4BHK house in Ahmedabad",
      house_address: "address",
      house_price: 20000,
      additional_details: "additional details of house",
    },
    {
      house_pic:
        "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Apr/29/Photo_h300_w450/72550691_4_hatsAppImage20240425at11.17.27AM1_300_450.jpeg",
      house_name: "4BHK",
      house_details: "4BHK house in Ahmedabad",
      house_address: "address",
      house_price: 20000,
      additional_details: "additional details of house",
    },
    {
      house_pic:
        "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Apr/29/Photo_h300_w450/72550691_4_hatsAppImage20240425at11.17.27AM1_300_450.jpeg",
      house_name: "4BHK",
      house_details: "4BHK house in Ahmedabad",
      house_address: "address",
      house_price: 20000,
      additional_details: "additional details of house",
    },
    {
      house_pic:
        "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Apr/29/Photo_h300_w450/72550691_4_hatsAppImage20240425at11.17.27AM1_300_450.jpeg",
      house_name: "4BHK",
      house_details: "4BHK house in Ahmedabad",
      house_address: "address",
      house_price: 20000,
      additional_details: "additional details of house",
    },
    {
      house_pic:
        "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Apr/29/Photo_h300_w450/72550691_4_hatsAppImage20240425at11.17.27AM1_300_450.jpeg",
      house_name: "4BHK",
      house_details: "4BHK house in Ahmedabad",
      house_address: "address",
      house_price: 20000,
      additional_details: "additional details of house",
    },
    {
      house_pic:
        "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Apr/29/Photo_h300_w450/72550691_4_hatsAppImage20240425at11.17.27AM1_300_450.jpeg",
      house_name: "4BHK",
      house_details: "4BHK house in Ahmedabad",
      house_address: "address",
      house_price: 20000,
      additional_details: "additional details of house",
    },
    {
      house_pic:
        "https://img.staticmb.com/mbphoto/property/cropped_images/2024/Apr/29/Photo_h300_w450/72550691_4_hatsAppImage20240425at11.17.27AM1_300_450.jpeg",
      house_name: "4BHK",
      house_details: "4BHK house in Ahmedabad",
      house_address: "address",
      house_price: 20000,
      additional_details: "additional details of house",
    },
  ];
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <Header />
      <div className="w-11/12 mx-auto mt-10 pb-16">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-10 tracking-wide">
          Luxurious Homes for Rent
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {houseData.map((house, index) => (
            <HouseCard key={index} houseData={house} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
