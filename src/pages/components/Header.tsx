import Link from "next/link";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { Dialog } from "@headlessui/react";
import { AiOutlineBars } from "react-icons/ai";
import { HiXMark } from "react-icons/hi2";
import { useState } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import "@rainbow-me/rainbowkit/styles.css";

import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { arbitrum } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "8c3fa0027e9be7e3081fc6321e210c05",
  chains: [arbitrum],
  ssr: true,
});
const queryClient = new QueryClient();

const Header = () => {
  const { address } = useAccount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Create", subname: "an badge", href: "/Editor" },
    { name: "Approve", subname: "Loans", href: "/ApproveLoan" },
    { name: "Received", subname: "Loans", href: "/receivedapplications" },
    { name: "Provide", subname: "Loan", href: "/ProvideLoan" },
  ];

  const navigation2 = [
    { name: "My Badges", subname: "", href: "/Badges" },
    { name: "Apply", subname: "Loan", href: "/ApplyLoan" },
    { name: "Verify", subname: "Loan", href: "/VerifyLoan" },
    { name: "Pay", subname: "Loan", href: "/Payloan" },
    { name: "Learn", subname: "", href: "/Learn" },
  ];
  if (typeof window !== "undefined") {
    localStorage.setItem("walletaddress", address || "");
  }
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {" "}
          <header className="absolute inset-x-0 top-0 z-50">
            <nav
              className="flex items-center justify-between p-6 lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:flex-1">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-16 w-auto"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABLFBMVEX///8AAABm1PFPwOjk6OtjbHfZRFLK0NfY3eLvx6RCSFJNTU10d3vP1t2EiIw3NzdSyPKmpqZLtdtEpskhUGHr7/NIT1dmaGkRExU/mblfaHMMBAXKP0z3bIIucYhHrdEkWGoKFxze3t7GysyOkpW+O0iQLTd/KDDjR1ak1P9IHyaxsbEtMDWaMDrp6elhHiWp2//T09O9vb2ZmZlLYnV/f39ucHJCQkI1OkL/cYhdXV0nJye1ub2xOEMYGBi1T19Yt9BJmK1fxuExMTFfX18YO0g5iqfivJtFOS8iR1FDi54bHSEWGBs1FxwpIhxVRzoOIyqGb1zlvp3LqYt1YVA0fZe3mX6Zf2n50KtCFRlRGR44LyciHBcyQU69noJxkrCUwOY4doYhCgwXMDaDsVDRAAANcklEQVR4nO2da2PaOBaGS0IJKSmXJBRTsgkB0rBr4qxhuQw0bCC3JkzbtJ1M0+7OzKb5//9hsSXZkiXbMsjGpH4/tCbyRY8l60hHR/azZ5EiRVpeqf0YrUFu0dkSJ5nBp6m/6IyJUsUGMBarLTprgtS2JRzmF503MUrZEsaURedNjDL2hJVF502MAOG//0boKRL+ggP+EhEulSLC5RerpXmKhO//QegJEj59exgRLrMiwuUXIOy9IvQECV89JxQRLpUiwuXXLIQV1cGFo6gO3o+8Gvxt80xYbZ/FYqUm+2xqqzs9sMVOrORSUizWEZRxbnkiBAC66IJScoZruUonyh2UaMPvm7gJK3KnhHUHZCJRabYHWGKaTFTbeL+i6zsTKS7CfLVt7ftgXv9qumtJbJuJaitVIhMzAdJpcifEqiZNOH22GImQUJHPS3RiuAgVucAAgISKvGGTOK2lebLehpMwR1VNXRIopjTTWz7U/y20HBJDRMhSJ5e0nwc4r62lbRP7NTUXdsJUay0/FZuwm36bjCfjbMKz9Nv49MhQE6b0PManYhBmOvLLeFIXTXhWkNW8fmh4CQcbWh7jUBbCYaFVTUI8mvC8Vo0bh4aUsN9SzTxaCbtpnM5CeJZuWo4MHaHUrTXzRB5xwrMN2UKHEQ46cpI+MnSETSqPGGE6TuMZhB36xoSSsMrgMwhrLD5EuMG6NRHhgghBvuNoiyRc05VEWy8Jwgp5ZDKkhGv6xjAZz9f0rXYeJzzTt94mkyAmJxPHCPNgsJjLx1VwtpASVsHW1GC0YROCE04QIcj6gCCEuy0HoWRDOHAnbEWE4SAszU64JLXU7jmUSMIJQdhdjjKMq+ramqpqbX51ag+qFmtR1aSZAn2DtBa6BdGP1M8RVmvxE1j8iDAijAgjwogwIowII8KIMOyE+iwFLUjIxI8jZwdTcsCElVZnKjDjNWgQAoT9Aksd4LvoMhMLYMyUYSeCezPULtsKICbDfjlQMGq7Z3G5AX1HVBbNF/N7XZXdqsMgJbtncw7VFo0X83uBIyDMbCxGmcAIC8mXi1CyEBzhy7VF6GVEGBF6IHzyz2E3vRh1AyNcrPwlzC0aL0aEqPog+1cpBCefB1B2caPByfeQ9vMFA577DagtK0gtTm06nD9SpJ9KiqwuOgtQquyLJ0Mz9uF4RZIWGOaD2Qe2PujFRyy19JyIt/vAjZgSfl7vAg5i8U7FmE/n9S7oshV9WtjlDkNbA4OlRDsVwdAs6BVybPmSl4o/9202Qbe02LYGjHylcLyoTAGhf2JHwqBiFISec3YVxFdTWEnD0rGviq+mLX8a6JkVE979AEY28AXjtuoI736Ae2azmH4BaoquU8JPOLdE3/JcaPqkSOCxETfAUAWfb37lRPcha6EZGyL1RZv8SmjG90iq/ETeEhMpUqRIkSKFRvlweC+sUoS9374lxTLh60BUMjFJ0Bg4F7ahE5BA518/ZMNfIDBmFTMcSIWYUMyYNcyEYjyK3Z+EMCy+UiTgMxWzzOTpl+HTfw7DTCimLT0PMaEYe1gInS9RU07gbFjHh9m6+ZUWOJXSFni3xAnUrLT7jhwKn09fk0i/flOgbRWnjMD2TwnxcyhoaC4LM60i1RU2PHwWpqhEXD5FKEaKFMk/VRw+jcMtMT0Mf5QXwBduREGr0AdBfmW1Um02m1VeiyFoTVopMAulGt+9GLa5jLUgwqDCM5tkq9HlYFwqQoVeQOc+TgSE26ubs6oYHGFlyLi3A7crQ8Ls6qzaCoxQtak/Lpe2EG6SqFlik/krMELs7SofPn5891+zFJ3bcYKweHF7vWVA3D3eljcNpt3Hx13jx2b59vEuGyyh8WmXT18+39/ff/7yG/qDs98NJ9QzKyGoS+3XBcIta7/KqBQvtF+XgRLCaOXYx6v7daD7q3fwb44Dfowwu6tv30GmW/0XLNJNECW/idfM22yAhKjv9Qnx6YywGCVeQr2cYrugoLL7+q8iYNoDp9oDv0D7uR8kISzC33DAqT6CPzsN+UUR+gwIY4M/rFt0BeqWkz9QEGGsy1qe3E21Bc0JQEvxu5Xw/itIcKhCoghtNRTCmGMX4fr6Z3AVh4v4TihmdQToblufQq0QQXvq4PIMgFCE6w84ur8yCD/pKQ7LI4MgFOC+BeaeegyNB9GhAx4I4fyTfW6EG74Tlg7fsHQIEeeup/a1FBh9/2tpaaeeSNRpnUDEeZ0cYKLvI4Pwg57i0JoJI0xMdXRI6GgKfQwOnHcSErqTrijCLyDBYawvkvBbzKJvO4kd+MnGOa0iHDpR1RRWUqdOo0BC9NBhOq7Xj8DWZD5C9MFzayF+ca8i4ghRhSR0kqh/B1sOrR2P4Cq6/5CAV3Ac7BS35TNhKZHYibnngkPwE57vrsyKeo8AHSfifSbU6ukbsDWYjxAuAY4Nf18HjPfrX9FFHOOYhRP+8S8oePUTowWa0/NvvOb3w9c/r9av/vxkeGqcO77CCf/6J9Rf4JAficQBzMmc88l23zN1sUQ+EP4d6g9wzGG9DlvZeaM6WJ8Zdn8HmI+E/4NZOEgk3oOtecdRrHfGub50xUdCVE/fm/V03kEGNVMmufck/G5LNZn11GvoCrWCNV/DPfsDnsioIAixeuotWEtbhUyN/Jpt/dPkEu9L6gIhPKwn4CBj6GWQAezDvCOvoAhRqof8wqlQyhhUmnIul5ObnOuVBPa8j2wJT7ShFRhk8HdP+/BgvKNQyXXwD7CftTmio0SOnhiDC11vNEDYeeN1aCiG8TMYlBbLIKZy/LNr84+AEwcsJYBAEXNGq6oSIkB1sWL/AtWOI6NYQid5ITTm3iUIqDi/PXUjmBGwOEIj3CIDc46m1uxlb4ZCSKicoWx3gW1RLGFb+4/X29ePEvnHvl0xhpDQKEFoJ5o4yPbN6QrS6c01nmTTAQghISocWPGwGno9WrFoPMIg2bY2IMI6cklxEIJxoASLJG0W36mVD5Skych8GIMh3Dn+9u0HL6Hur0jB7p3xLvh9Np+mkSNiIIQ7Rha42tJKp48qnFFFH2z5NG2j3RiDqUAIsc6Ot/UpRiNDPYAW3aAd6c4qTninb4MgktXsNc60qvPur+K8F7yEeJ+cTVipFVgVzAgSsq+h1ppKe/TweJpNDQNF0ICs76IImksMHsalbK1yEuJ9chZhM2WTgnxP7oAmItW1J6O+7rbvVg3t7ZaLRqBXdqtc3jJ/Fcu7e6vchIlje8Kq4SWknqGcB0AT0WoWScIsFrrG+YuLsH5ydHRMEyrNNjYYspqzPDSMN1yAKysPYPczR0KU+72t4tYmiWQnBmG9njg4OTnQ/sf+SNnDnMUBanWnQkNR5gRcWbkAB1ieaIowu3kJ94yVizMRHhwC0xf7cXiAIVoJ0QgXyeoWhM2MNOYmHMMzORNu7uJXvb10gmMR1g++4yf4flC3IbREixYohzg0hW52glFPZQfCbHHfcmevN50BrYTUOP/QhhB3fWZajIEBvMceAFfGIPekz5IghBaR1J4Xwu/08d/ZhGZAbJrpUqp6L0LD8BMnxAmZgG6IBCE1z40hWp/DFig9O48ZcFrsewJETyIxy4X3aYpmrkrY+PLWqaJm8VgMrO8iYSc4rjPb0orstCoEuOacu6O0QMeTqKaA8HqrWCxuoUxJjRdT9Rooh2Ut1U6XgPDo5OTkDTpg0tNPMEG/30wTTw6thI6CDRGfsTc1Aofhd47hAdH5dE3oRA6Veuj4XolO5Zx/Anf+0SPgygq4SNN6IkJG/mZElLDjX0h0Op/HFDyG/NYe6VE/zgxVZCxhaOAZfPGrd0Li+BeMHbgWh4P+Dm+HzdSDfpw5E0B7ISUygz3PgOQdetFg7MIxO5MH/VWvjyGyF2bf1DaDjUljxnoK78xk0rMtRI5ZMWgtvROeggMthJIuPIPa1gQvA8ldoFXBjuph9VzCr8Ex/wQJx4IIX2t6hRGCKtIzq6n02lXPG1gdwM4FKkHjub7Pr7yElVkJx2xC7fPor6hcEYTPXWVDOICEuiaLIrSWYWOGMnzdwwj16ijhZfjaWxnCWuqtV6rphkmIyzQSDdu20EmS2QTjzyEhnnlgMFV467UQYRGaNpe+OmxCe43ejAYRWQlkNRi78MRGQVf3ozfE031wmDnMpz8JX5rXHg7IEzCsDVcInzG48mL0H+AxEuM8piZEBhm9LjfhvT7mHeILVjA6zPs3fOU4vmFeoUpnAO+UzNBpIxBZgLxv9MH8OOWRG+R4tG3uTrpMFbqiGqXYm6EENRn3iNFM9fkDaQlX3OPDyK6Dczp6eMR3dQjlM6ZatR5Xr2EUIG/AnfG92VKjh48vZ/3yDXXzb7cfbkaj09PxeGU8Pj0djW4ervetOznVEcZTqd927izZTLfP/F6u5oB9Qge5vIOAuR484yFQi67yLjfVTTnGGNpBA9dWjIHoLZyQ8XHrOYNKZf63y6R4FnUoVk+01wKoWlqnwfwveGXHQlkkucZGGWriTVjHexuRb2ERoBNB791WqrVz+2fyrFBTPcXmVlp6QQ473HfFomZbr1ldwV8pVtRcq93PmDdwmDlvt2RvcJEiRQpU/wcpenqpMiyOJAAAAABJRU5ErkJggg=="
                    alt=""
                  />
                </Link>
              </div>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <AiOutlineBars className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="hidden lg:flex lg:items-center lg:justify-center lg:gap-x-12 ">
                {address == "0x3907bAdE047531158c97c8C51b95c72a51E5e37e" ? (
                  <>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="mt-2 pt-5 text-center text-lg font-semibold leading-6 text-white"
                      >
                        {item.name} &nbsp;
                        {item.subname}
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
                    {navigation2.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="mt-2 pt-5 text-lg font-semibold leading-6 text-white"
                      >
                        {item.name} &nbsp;
                        {item.subname}
                      </Link>
                    ))}
                  </>
                )}
                <div className="pt-5">
                  <ConnectButton />
                </div>
              </div>
            </nav>
            <Dialog
              as="div"
              className="lg:hidden"
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
            >
              <div className="fixed inset-0 z-50" />
              <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto"
                      src="data:image/png;base64,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"
                      alt=""
                    />
                  </Link>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <HiXMark
                      className="h-8 w-8 rounded-lg border border-white text-gray-200"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-500/10">
                    <div className="mt-5 space-y-6 py-6">
                      {address ==
                      "0x3907bAdE047531158c97c8C51b95c72a51E5e37e" ? (
                        <>
                          {navigation.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="mt-2 flex text-lg font-semibold leading-6 text-white hover:bg-gray-700"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </>
                      ) : (
                        <>
                          {navigation2.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="mt-2 flex text-lg font-semibold leading-6 text-gray-200  hover:bg-gray-700"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </>
                      )}
                    </div>
                    <div className="py-6">
                      <p className=" block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-200 hover:bg-gray-700">
                        <ConnectButton />
                      </p>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Dialog>
          </header>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Header;
