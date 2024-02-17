interface InputBoxProps {
  placeholder?: string;
  value?: string;
  label?: string;
  setValue: (value: string) => void;
  style?: any;
  inputType?: React.HTMLInputTypeAttribute;
}

function TextInput(props: InputBoxProps) {
  const { value, inputType = "text", label = "", placeholder = "", setValue, style } = props;
  return (
    <div style={{ paddingTop: 10}}>
      {label && <p>{label}</p>}
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        type={inputType}
        style={{
          backgroundColor: "transparent",
          borderWidth: 1,
          borderRadius: 4,
          padding: 12,
          marginTop: 4,
          width: "90%",
          borderColor: "gray",
          ...style,
        }}
      />
    </div>
  );
}

export default TextInput;
