// src/components/ContactForm.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../lib/supabase';

// ✅ Esquema de validación con Zod
const contactoSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(50, { message: 'El nombre no puede exceder 50 caracteres' }),
  correo: z
    .string()
    .email({ message: 'Correo electrónico inválido' }),
  telefono: z
    .string()
    .regex(/^[0-9]{8,12}$/, {
      message: 'Ingrese un número de teléfono válido (8–12 dígitos)',
    }),
});

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(contactoSchema)
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { error } = await supabase.from('contactos').insert([
        {
          nombre: data.nombre,
          correo: data.correo,
          telefono: data.telefono
        }
      ]);

      if (error) throw error;

      setSubmitStatus({ type: 'success', message: 'Datos guardados correctamente' });
      reset();
    } catch (error) {
      console.error('Error al guardar datos:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Error al guardar datos: ' + error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Formulario de Contacto</h2>

      {submitStatus && (
        <div
          className={`p-4 mb-4 rounded ${
            submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-semibold">Nombre</label>
          <input
            type="text"
            {...register('nombre')}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
        </div>

        <div>
          <label className="block font-semibold">Correo</label>
          <input
            type="email"
            {...register('correo')}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.correo && <p className="text-red-500 text-sm">{errors.correo.message}</p>}
        </div>

        <div>
          <label className="block font-semibold">Teléfono</label>
          <input
            type="text"
            {...register('telefono')}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
