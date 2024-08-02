import React, { useState } from "react";
import Header from "./components/Header";
import Link from "next/link";
import { approvelo, verifylo } from "./BlockchainServices";

interface User {
  aadhaarnumber: string;
}

function getdateformat(number: any) {
  const millisec = number * 1000;
  const date = new Date(millisec);
  return date;
}

const VerifyLoan = () => {
  const [field, setField] = useState([]);
  const [user, setUser] = useState<User>({
    aadhaarnumber: "",
  });
  function getdate(data: any) {
    const test = getdateformat(data);
    const date = test?.getDate();
    const month = test?.getMonth() + 1;
    const year = test?.getFullYear();
    const format = `${date}${month}${year}`;
    return year;
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user, //spread operator
      [name]: value,
    });
  };
  const submitform = async () => {
    const aadhaarnumber = user.aadhaarnumber;
    const res = await verifylo({ aadhaarnumber });
    setField(res);
    console.log(res);
  };

  return (
    <div className="bg-[#140506] ">
      <Header />

      <div className=" mt-20 max-h-max bg-[#140506] py-10 ">
        <div className="flex flex-1 flex-col justify-center px-4 pt-10 sm:px-4   lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full  max-w-sm rounded-xl bg-white px-10 py-5 lg:w-96">
            <div>
              <h2 className="mt-5 text-3xl font-extrabold  text-green-700">
                Verify with your loan
              </h2>
            </div>
            <div className="mt-8">
              <div className="mt-6">
                <form action="#" method="POST" className="space-y-6">
                  <div>
                    <label
                      htmlFor="aadhaarnumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Enter the Aadhaar Number
                    </label>
                    <div className="mt-1">
                      <input
                        id="aadhaarnumber"
                        name="aadhaarnumber"
                        type="text"
                        value={user.aadhaarnumber}
                        onChange={handleChange}
                        autoComplete=""
                        required
                        className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={submitform}
                      className="bg-indigo-60 mb-2 mr-2 flex w-full justify-center rounded-lg rounded-md border-transparent bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 px-5 py-2.5 text-center text-lg text-sm font-medium text-white text-white shadow-lg shadow-sm shadow-purple-500/50 hover:bg-gradient-to-br focus:outline-none focus:outline focus:ring-2 focus:ring-purple-800 focus:ring-offset-2 dark:shadow-lg dark:shadow-purple-200 dark:focus:ring-purple-800"
                    >
                      {" "}
                      Submit{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className=" overflow-x-scroll md:overflow-hidden">
            <table className="mt-5 md:ml-32">
              <tr className="space-x-3 border-2 border-white text-2xl text-green-300">
                <th className="p-5">Farmer Name</th>
                <th className="p-5">Aadhaar Number</th>
                <th className="p-5">Amount of loan</th>
                <th className="p-5">Reason for Loan</th>
                <th className="p-5">Status</th>
                <th className="p-5">Applied At</th>
                <th className="p-5">Loan Sanctioned</th>
                <th className="p-5">Deadline</th>
                <th className="p-5">IsPaid</th>
              </tr>

              <tr
                className="border-2 border-white text-center text-lg text-white"
                key="1"
              >
                <td>{field[0]}</td>
                <td>{parseInt(field[1])}</td>
                <td>{parseInt(field[2])}</td>
                <td>{field[3]}</td>
                <td>{field[4] === true ? "approved" : "unapproved"}</td>
                <td>2024</td>
                <td>{field[6] === true ? "Sanctioned" : "Not Sanctioned"}</td>
                <td>30</td>
                <td>{field[8] === true ? "Paid" : "Not Paid"}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyLoan;
