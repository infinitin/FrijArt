import React, {useEffect, useMemo, useState} from "preact/compat"
import {Fragment, h} from "preact"
import {CompletedWebForm, encryptedOrDecryptedFormData} from "../actions/encrypt-text"
import {createDebouncer} from "../actions/debounce"
import {TextArea} from "../components/TextArea"
import {TimeInput} from "../components/TimeInput"
import {errorMessage} from "../actions/errors"
import {Network} from "../App"

type TextEncryptProps = {
    network: Network
}
const TextEncrypt = (props: TextEncryptProps) => {
    const [plaintext, setPlaintext] = useState("Kylian Mbappé\nFootballer\nFrance")
    const [ciphertext, setCiphertext] = useState("")
    const [decryptionTime, setDecryptionTime] = useState(Date.now())
    const [birthday, setBirthday] = useState(Date.now())
    const [error, setError] = useState("")
    const debounced = useMemo(() => createDebouncer<CompletedWebForm>(), [])

    useEffect(() => {
        if (!plaintext) {
            return
        }

        debounced(() => encryptedOrDecryptedFormData(props.network, {plaintext, ciphertext, decryptionTime}))
            .then(output => {
                setCiphertext(output.ciphertext ?? "")
                setDecryptionTime(output.decryptionTime)
            })
            .catch(err => {
                console.error(err)
                setError(errorMessage(err))
            })
    }, [plaintext, decryptionTime, props.network])

    function updateFromBirthday(date) {
        setBirthday(date)
        var eighteenth_birthday = new Date(date)
        eighteenth_birthday.setFullYear(eighteenth_birthday.getFullYear() + 18)
        setDecryptionTime(eighteenth_birthday.getTime())
    }

    function updateFromDecryptionTime(date) {
        setDecryptionTime(date)
        var birthday = new Date(date)
        birthday.setFullYear(birthday.getFullYear() - 18)
        setBirthday(birthday.getTime())
    }

    return (
        <Fragment>
            <div className={"col-sm-6 p-3"}>
                <div className="row mb-6">
                    <TimeInput
                        label={"Birthday"}
                        value={birthday}
                        onChange={updateFromBirthday}
                    />
                </div>
            </div>

            <div className={"col-sm-6 p-3"}>
                <div className="row mb-6">
                    <TimeInput
                        label={"Decryption time (18th Birthday)"}
                        value={decryptionTime}
                        onChange={updateFromDecryptionTime}
                    />
                </div>
            </div>

            <div class="row light-bg p-0">
                <div class="col-12 col-lg-6 p-3">
                    <div className="row mb-6">
                        <TextArea
                            label={"Profile"}
                            value={plaintext}
                            onChange={setPlaintext}
                        />
                    </div>
                </div>
                <div class="col-12 col-lg-6 p-3">
                    <div className="row mb-6">
                        <TextArea
                            label={"Ciphertext"}
                            value={ciphertext}
                            onChange={setCiphertext}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export {TextEncrypt}
