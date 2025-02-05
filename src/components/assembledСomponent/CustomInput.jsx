import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {observer} from "mobx-react-lite";

const CustomInput = observer(({placeholder, id, label, onChange} ) => {
    return (
        <>
            <Label htmlFor={id}>{label}</Label>
            <Input
                className="mt-2 no-outline mb-3 bt-1"
                style={{ outline: "none", boxShadow: "none" }}
                id={id}
                placeholder={placeholder}
                onChange={onChange}
            >
            </Input>
        </>
    );
});

export default CustomInput;