import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosInstance';
import { BsCashCoin } from "react-icons/bs";
import Money from '../../assets/Money.png'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { TEChart } from "tw-elements-react";
import { useSelector } from 'react-redux';
const DashBoard = () => {

  
  const {user} = useSelector(state => state.user);
  const [studentsPerMonth, setstudentsPerMonth] = useState([]);
  const months = [`January ${new Date().getFullYear()}`,`February ${new Date().getFullYear()}`, `March ${new Date().getFullYear()}`, `April ${new Date().getFullYear()}`, `May ${new Date().getFullYear()}`, `June ${new Date().getFullYear()}`, 
    `July ${new Date().getFullYear()}`, `August ${new Date().getFullYear()}`, `September ${new Date().getFullYear()}`, `October ${new Date().getFullYear()}`, `November ${new Date().getFullYear()}`, `December ${new Date().getFullYear()}`];

    
  const [getMonthwiseValue, setGetMonthwiseValue] = useState([])
  const getstudentsPerMonth = async (id) => {
    
    const res = await axiosInstance.get(`/api/admin/studentPerMonth/${id}`)
    setstudentsPerMonth(res.data.studentsPerMonth);

  }
  

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalFees, setTotalFees] = useState(0);

  const calCollectedAmount = async () => {
    const res = await axiosInstance.get(`api/admin/collectedAmount`);
    // console.log( res.data.totalFees);
    
    setTotalAmount(res.data.totalAmount);
    setTotalFees(res.data.totalFees);
  }
  
  useEffect(() => {
    calCollectedAmount();
    
    if(user){
      getstudentsPerMonth(user.userId);
    }
    months.forEach(month => {
      studentsPerMonth.map(obj => {
 
        
        if(obj.month !== month){
          getMonthwiseValue.push(0);
        }else{
          getMonthwiseValue.push(obj.studentCount);
        }
      })
    });
  }, [])

  return (
    <div className='mx-2 md:grid md:grid-cols-5 md:gap-2 justify-evenly '>
      {/* COLLECTED AMOUNT CARD */}
      <div className='bg-indigo-700 mb-3 flex justify-between items-center col-span-1 p-3 rounded h-fit md:h-[18rem] max-xsm:flex max-xsm:flex-col md:flex md:flex-col md:justify-evenly md:items-center  md:p-2' >
        {/* --- */}
        <div className='flex items-center w-full'>
          <BsCashCoin size={38} className='bg-white rounded p-1'/>
          <div className='text-white'>
            <p className='ml-2 text-[14px] font-thin'>{
              new Date().toLocaleDateString("en-US", {month: "long"})
                }</p>
            <p className='ml-2 text-[14px] md:text-base'>Collected Fees</p>
          </div>
        </div>

        {/* IMAGE  */}
        <div className='w-full hidden  md:block md:flex md:justify-center'>
          <img src={Money} alt="" className='h-auto w-7/12 md:w-36' />
        </div>

        {/* AMOUNT */}
        {totalAmount ? (
          <p className='text-white text-sm flex items-center'>
            <FaIndianRupeeSign /> {totalAmount}/{totalFees}
          </p>
        ) : (
          <p className='flex items-center justify-center mt-2 text-white' >
            <FaIndianRupeeSign /> 0
          </p>
        )}
      </div>

{/* ____________ */}




  <div className='bg-slate-800 col-span-3 rounded p-2 h-[18rem]'>
      <TEChart
        className='h-96'
        type="bar"
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Admissionss",
              // data: [2112, 2343, 2545, 3423, 2365, 1985, 987, 900],
              data: getMonthwiseValue,
              backgroundColor: 'rgb(100, 116, 139)', // Adjust bar color if needed
              borderColor: 'rgba(255, 255, 255, 1)',
              borderRadius: {
                topLeft: 10,  // Top left corner
                topRight: 10, // Top right corner
                bottomLeft: 0,  // Bottom left corner
                bottomRight: 0, // Bottom right corner
              },
              barThickness: 10
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true, // Starts the y-axis at 0
              min: 0,            // Minimum value on the y-axis
              max: 15,         // Maximum value on the y-axis
              ticks: {
                stepSize: 1,  // Sets the step size between values on the y-axis
                callback: function(value) {
                  return value + ' students'; // Customize y-axis labels
                },
                color: 'rgb(242, 242, 242)',
              },
              title: {
                display: true,
                text: 'Students',
                color: 'white'  // Y-axis label
              },
              
            },
            x: {
              ticks: {
                color: 'rgb(242, 242, 242)', // Text color for x-axis ticks
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: 'white', // Text color for legend labels
              }
            },
            title: {
              display: true,
              text: 'Monthly Admissions',
              color: 'white',
              font: {
                size: 17, // Text size for chart title (in pixels)
                weight: 'bold', // Font weight, optional
              }
            },
          },
        }}
      />
</div>


{/* ____________ */}




    </div>
  )
}

export default DashBoard