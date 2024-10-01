import '@dotlottie/player-component';
const InputField = ({ type, id, label, name, value, onChange }) => (
    <div className="relative">
      <input
        type={type}
        id={id}
        className="peer p-4 pt-7 block w-full rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 bg-gray-100"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
      />
      <label htmlFor={id} className="absolute top-0 p-4 text-sm transition-all ease-in-out duration-100 peer-focus:scale-90 peer-focus:-translate-y-1.5 text-gray-500">
        {label}
      </label>
    </div>
  );
  
  const SelectField = ({ id, label, name, value, onChange, options }) => (
    <div className="relative">
        <label htmlFor={id} 
        className={`absolute top-3 left-4 text-sm text-gray-500 transition-all 
              duration-100 ease-in-out transform peer-placeholder-shown:translate-y-0 
              peer-placeholder-shown:scale-100 peer-focus:scale-90 peer-focus:-translate-y-3`}>
            {label}
        </label>
      <select
        id={id}
        className="peer p-4 pt-7 block w-full rounded-lg text-sm focus:border-blue-500 bg-gray-100"
        name={name}
        value={value}
        onChange={onChange}
      >
        {options && options.ageGroups.map((item, index) => (
          <option key={index} value={item}>{`${item}`}</option>
        ))}
      </select>
    </div>
  );
  
  const FileInput = ({ label, name, onChange }) => (
    <div className='bg-gray-100 p-2 rounded'>
      <label className='text-sm text-gray-500 scale-90'>{label}</label>
      <input type="file" className="block w-full text-sm text-gray-500 file:rounded-lg file:bg-slate-500 file:text-white" name={name} onChange={onChange} />
    </div>
  );
  
  const DateInput = ({ label, name, value, onChange }) => (
    <div className='flex-col bg-gray-100 p-2 rounded'>
      <label className='block mb-2'>{label}:</label>
      <input type="date" className='border px-3 py-2' name={name} value={value} onChange={onChange} />
    </div>
  );
  
  const LoadingIndicator = () => (
    <div className='absolute inset-0 flex items-center bg-black/30 justify-center'>
      <dotlottie-player src="https://lottie.host/1572ab5e-e801-48df-96b1-c5f2506bfcdb/kSsbxuy1ti.json" speed="2" style={{ width: '200px', height: '200px' }} loop autoplay />
    </div>
  );
  
  const SuccessMessage = ({ message }) => (
    <div className='absolute inset-0 flex items-center justify-center bg-green-200 bg-opacity-30'>
      <div className='bg-white p-5 rounded-lg shadow-lg text-center'>
        <dotlottie-player
          src="https://lottie.host/51a54f3f-ac0f-47ad-afd3-fef6757602e3/tssFSkaMXs.json"
          background="transparent"
          speed="1"
          style={{ width: '100px', height: '100px' }}
          autoplay
        />
        <p className='text-green-600 mt-3'>{message}</p>
        <p className='text-gray-400 text-sm'>(added to table)</p>
      </div>
    </div>
  );
  

export {InputField,SelectField, FileInput, DateInput, LoadingIndicator ,SuccessMessage}