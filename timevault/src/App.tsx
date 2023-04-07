import React, {useState} from "preact/compat"
import {h} from "preact"
import {Tab, TabView} from "./components/TabView"
import {TextEncrypt} from "./views/TextEncrypt"
import {MultiDecrypt} from "./views/MultiDecrypt"
import {Dropdown, DropdownItem} from "./components/Dropdown"

export type Network = "mainnet" | "testnet"
const networks: Array<DropdownItem<Network>> = [
    {
        label: "Testnet",
        value: "testnet"
    },
    {
        label: "Mainnet",
        value: "mainnet"
    },
]
const App = () => {
    // mainnet is the default network
    const [networkURL, setNetworkURL] = useState<Network>(networks[1].value)
    return (
        <div>
            <Dropdown
                label={"Network"}
                items={networks}
                onChange={newNetworkURL => setNetworkURL(newNetworkURL)}
            />
            <TabView>
                <Tab title={"Text"}>
                    <TextEncrypt network={networkURL}/>
                </Tab>
                <Tab title={"Decrypt"}>
                    <MultiDecrypt network={networkURL}/>
                </Tab>
            </TabView>
        </div>
    )
}

export {App}
