const InputForm = (props) => {
  const {label, type, name, placeholder} = props;
  return (
    <div className="mb-6">
      <label 
        htmlFor={name} 
        className="block text-slate-700 text-sm mb-2 font-bold"
      >
        {label}
      </label>
      <input 
        type={type} 
        name={name} 
        id={name} 
        placeholder={placeholder}
        className="text-sm border w-full px-3 py-2 rounded text-slate-700"
        required
      />
    </div>
  );
}

export default InputForm