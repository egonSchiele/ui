import { Label } from "../../../components/ui/form/label.jsx";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "../../../components/ui/form/select.jsx";
import React from "react";
import { HGroupXS } from "../../../components/ui/layout/hgroupXS.jsx";
import { VGroupSM } from "../../../components/ui/layout/vgroupSM.jsx";
import { VGroupXS } from "../../../components/ui/layout/vgroupXS.jsx";
import { Button } from "../../../components/ui/form/button.jsx";
import { Input } from "../../../components/ui/form/input.jsx";
import { Textarea } from "../../../components/ui/form/textarea.jsx";
import { cn } from "../../../utils";
import { VGroupMD } from "../layout/vgroupMD";
function ErrorMessage({ children }) {
    return <p className="text-red-500 text-sm leading-none">{children}</p>;
}
export function FormInput({ field, value, onChange, error, }) {
    return (<VGroupXS>
      <HGroupXS>
        <Label htmlFor={field.name} className={cn(field.disabled && "text-primary/70")}>
          {field.label}
        </Label>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </HGroupXS>
      <Input type={field.isNumber ? "number" : "text"} name={field.name} value={value} onChange={(e) => onChange(e.target.value)} required={field.required} disabled={field.disabled} className={field.className}/>
    </VGroupXS>);
}
export function FormSelect({ field, value, onChange, error, }) {
    var _a;
    return (<VGroupXS>
      <Label htmlFor={field.name} className={cn(field.disabled && "text-primary/70")}>
        {field.label}
      </Label>
      <Select value={`${value}`} onValueChange={(value) => onChange(value)} required={field.required} disabled={field.disabled} name={field.name}>
        <SelectTrigger className={cn("w-[180px]", field.className)}>
          <SelectValue placeholder={field.placeholder || ""}/>
        </SelectTrigger>
        <SelectContent>
          {(_a = field.options) === null || _a === void 0 ? void 0 : _a.map((option) => (<SelectItem key={option.key} value={option.value}>
              {option.label}
            </SelectItem>))}
        </SelectContent>
      </Select>
    </VGroupXS>);
}
export function FormTextarea({ field, value, onChange, error, }) {
    return (<VGroupXS>
      <Label htmlFor={field.name} className={cn(field.disabled && "text-primary/70")}>
        {field.label}
      </Label>
      <Textarea name={field.name} value={value} onChange={(e) => onChange(e.target.value)} rows={field.rows || 3} required={field.required} disabled={field.disabled} className={field.className} placeholder={field.placeholder || ""}/>
      {field.showCharCount && (<p className="text-xs text-primary/70">{`${value}`.length} chars</p>)}
    </VGroupXS>);
}
export function SimpleForm({ fields, onSubmit, onChange, onCancel, submitButtonText = "Submit", className = "", }) {
    const [formValues, setFormValues] = React.useState(fields.reduce((acc, field) => {
        acc[field.name] = field.initialValue || "";
        return acc;
    }, {}));
    const [errors, setErrors] = React.useState({});
    const handleChange = (name, value) => {
        setFormValues((prev) => (Object.assign(Object.assign({}, prev), { [name]: value })));
        if (onChange) {
            onChange(Object.assign(Object.assign({}, formValues), { [name]: value }));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        fields.forEach((field) => {
            if (field.validate) {
                newErrors[field.name] = field.validate(formValues[field.name]);
            }
        });
        setErrors(newErrors);
        if (Object.values(newErrors).every((error) => error === null)) {
            onSubmit(formValues);
        }
    };
    const fieldToComponent = (field) => {
        const value = formValues[field.name];
        const error = errors[field.name];
        switch (field.type) {
            case "input":
                return (<FormInput key={field.name} field={field} error={error} value={value} onChange={(val) => handleChange(field.name, val)}/>);
            case "select":
                return (<FormSelect key={field.name} field={field} error={error} value={value} onChange={(val) => handleChange(field.name, val)}/>);
            case "textarea":
                return (<FormTextarea key={field.name} field={field} error={error} value={value} onChange={(val) => handleChange(field.name, val)}/>);
            default:
                return null;
        }
    };
    return (<VGroupMD className={className}>
      <VGroupSM>{fields.map(fieldToComponent)}</VGroupSM>
      <HGroupXS>
        {onCancel && (<Button onClick={onCancel} variant="secondary">
            Cancel
          </Button>)}
        <Button onClick={handleSubmit} variant="default" disabled={Object.values(errors).some((error) => error !== null)}>
          {submitButtonText}
        </Button>
      </HGroupXS>
    </VGroupMD>);
}
