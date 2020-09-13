import { useFormik } from 'formik'
import * as yup from 'yup'
import MaskedInput from 'react-text-mask'
import styles from '../styles/contact-form.module.scss'

export default function ContactForm() {
  const { getFieldProps, touched, errors, isValid, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      city: '',
      healthPlan: '',
      details: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('O nome é obrigatório'),
      email: yup.string().required('O email é obrigatório').email('O email deve ser válido'),
      phone: yup.string().required('O telefone é obrigatório').min(15, 'O telefone deve conter ao menos 10 números'),
      city: yup.string().required('A cidade é obrigatória'),
      healthPlan: yup.string().required('O plano de saúde é obrigatório'),
      details: yup.string().required('Os detalhes são obrigatórios')
    }),
    onSubmit: (values) => {
      console.log(values)
    }
  })
  return (
    <form id='contact-form' className={styles.contactForm} onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <div className={styles.sectionHead}>
          <h2>Converse conosco</h2>
          <h3>Estamos preparados para lhe atender da melhor forma possível</h3>
        </div>
        <div className={styles.sectionBody}>
          <div>
            <label htmlFor='name-input'>Nome</label>
            <input id='name-input' type='text' {...getFieldProps('name')}/>
            {touched.name && errors.name ? <small>{errors.name}</small> : null}
          </div>
          <div>
            <label htmlFor='email-input'>Email</label>
            <input id='email-input' type='email' {...getFieldProps('email')}/>
            {touched.email && errors.email ? <small>{errors.email}</small> : null}
          </div>
          <div>
            <label htmlFor='phone-input'>Telefone</label>
            <MaskedInput
              id='phone-input'
              type='tel'
              mask={['(', /[0-9]/, /[0-9]/, ')', ' ', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/]}
              guide={false}
              {...getFieldProps('phone')}
            />
            {touched.phone && errors.phone ? <small>{errors.phone}</small> : null}
          </div>
          <div>
            <label htmlFor='city-input'>Cidade</label>
            <input id='city-input' type='text' {...getFieldProps('city')}/>
            {touched.city && errors.city ? <small>{errors.city}</small> : null}
          </div>
          <div>
            <label htmlFor='health-plan-input'>Plano de Saúde</label>
            <input id='health-plan-input' type='text' {...getFieldProps('healthPlan')}/>
            {touched.healthPlan && errors.healthPlan ? <small>{errors.healthPlan}</small> : null}
          </div>
          <div>
            <label htmlFor='details-textarea'>Como podemos ajudar?</label>
            <textarea id='details-textarea' rows='10' cols='50' {...getFieldProps('details')}/>
            {touched.details && errors.details ? <small>{errors.details}</small> : null}
          </div>
          <button type='submit' disabled={!isValid}>Enviar</button>
        </div>
      </div>
    </form>
  )
}