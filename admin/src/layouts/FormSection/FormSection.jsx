import './FormSection.css';

const FormSection = ({ title, fields = [], onChange, onSubmit, errors }) => {

  const handleChange = (key, value) => {
    if (onChange) {
      // Tạo object mới với giá trị updated
      const currentData = fields.reduce((acc, field) => {
        acc[field.key] = field.value ?? field.defaultValue ?? (field.type === "quantity" ? 1 : "");
        return acc;
      }, {});

      onChange({ ...currentData, [key]: value });
    }
  };

  const handleQuantityChange = (key, currentValue, delta) => {
    const newValue = Math.max(1, (currentValue || 1) + delta);
    handleChange(key, newValue);
  };

  const renderField = (field) => {
    const { key, type, placeholder, options, rows, value, defaultValue } = field;
    const fieldValue = value ?? defaultValue ?? (type === "quantity" ? 1 : "");
    const error = errors?.[key];

    switch (type) {
      case "select":
        return (
          <select value={fieldValue} onChange={(e) => handleChange(key, e.target.value)} className={error ? "error-input" : ""}>
            <option value="">{placeholder || "Select..."}</option>
            {options?.map((opt, idx) => {
              const optValue = typeof opt === 'object' ? opt.value : opt;
              const optLabel = typeof opt === 'object' ? opt.label : opt;
              return (
                <option key={idx} value={optValue}>
                  {optLabel}
                </option>
              );
            })}
          </select>
        );

      case "textarea":
        return (
          <textarea
            placeholder={placeholder}
            rows={rows || 5}
            value={fieldValue}
            onChange={(e) => handleChange(key, e.target.value)}
          />
        );

      case "quantity":
        return (
          <div className="quantity-input" >
            <button type="button" onClick={() => handleQuantityChange(key, fieldValue, -1)}>
              -
            </button>
            <input type="number" value={fieldValue} readOnly />
            <button type="button" onClick={() => handleQuantityChange(key, fieldValue, 1)}>
              +
            </button>
          </div>
          
        );
        
      case "custom":
        return field.render ? field.render() : null;


      default:
        return (
          <input
            type="text"
            placeholder={placeholder}
            value={fieldValue}
            onChange={(e) => handleChange(key, e.target.value)}
            className={error ? "error-input" : ""}
          />
        );
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      const formData = fields.reduce((acc, field) => {
        acc[field.key] = field.value ?? field.defaultValue ?? (field.type === "quantity" ? 1 : "");
        return acc;
      }, {});
      onSubmit(formData);
    }
  };

  return (
    <div className="form-section">
      <h3>{title}</h3>

      <div className="form-grid">
        {fields.map((field) => (
          <div key={field.key} className="form-group">
            <label>{field.label}</label>
            {renderField(field)}
            <p className="error-text">{errors[field.key]}</p>
          </div>
        ))}
      </div>

      {onSubmit && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </div>
  );
};

export default FormSection;