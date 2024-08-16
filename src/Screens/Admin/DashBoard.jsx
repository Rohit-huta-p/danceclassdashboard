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
  

  // console.log(studentsPerMonth);
  

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
  console.log(studentsPerMonth);
  
console.log(getMonthwiseValue);

  return (
    <div className='mx-2 md:grid md:grid-cols-5 md:gap-2 justify-evenly '>
      {/* card */}
      <div className='bg-violet-400 mb-3 flex flex-col h-[18rem] items-between justify-evenly col-span-1 inline-block p-2 rounded'>
        <div className='flex items-center'>
          <BsCashCoin size={38} className='bg-white rounded p-1'/>
          <div>
            <p className='ml-2 text-sm font-thin'>{
              new Date().toLocaleDateString("en-US", {month: "long"})
                }</p>
            <p className='ml-2'>Collected Amount</p>
          </div>
        </div>
        <div className='flex justify-center w-full'>
          <img src={Money} alt="" className='h-auto w-36 ml-2' />
        </div>
        {totalAmount ? (
          <p className='flex items-center justify-center mt-2 text-xl '>
            <FaIndianRupeeSign /> {totalAmount}/{totalFees}
          </p>
        ) : (
          <p className='flex items-center justify-center mt-2' >
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
              max: 30,         // Maximum value on the y-axis
              ticks: {
                stepSize: 2,  // Sets the step size between values on the y-axis
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