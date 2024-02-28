import { FC } from 'react';
import { FieldError, Path, UseFormRegister } from 'react-hook-form';
import { FormValues } from '../Form/AuthForm/AuthForm';

export interface ILabelProps {
  name: Path<FormValues>;
  register: UseFormRegister<FormValues>;
  errors?: FieldError | undefined;
  placeholder: string;
  type?: 'text' | 'email';
  rules?: Record<string, string | number>;
  title: string
}

const Label: FC<ILabelProps> = ({
  name,
  register,
  errors,
  rules,
  type,
  title
}) => {
  return (
    <label>
      <div className='authForm__label-title'>{title}:</div>
      <input
        type={type}
        className='authForm__input'
        {...register(name, {
          ...rules,
        })}
      />
      <div className='Form-error'>
        {errors && <p>{errors?.message || 'Ошибка!'}</p>}
      </div>
    </label>
  );
};

export {Label};
