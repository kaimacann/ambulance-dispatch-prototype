import React from 'react';

type FieldVariant = 'gp' | 'intake';

const fieldClasses: Record<FieldVariant, string> = {
	gp: 'flex h-10 w-full rounded-md border border-primary-6 bg-white px-3 py-2 text-base text-primary-12 placeholder:text-primary-11/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-11 disabled:cursor-not-allowed disabled:opacity-50',
	intake: 'mt-1 h-10 w-full rounded-md border border-primary-6 bg-white px-3 text-primary-12 placeholder:text-primary-8',
};

const buttonClasses = {
	primary: 'rounded-md bg-primary-9 font-semibold text-white hover:bg-primary-10 disabled:cursor-not-allowed disabled:opacity-60',
	destructive:
		'inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-rose-700 bg-rose-600 px-4 text-base font-semibold text-white transition-colors hover:bg-rose-600/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
	outline: 'rounded-md border border-primary-5 font-semibold hover:bg-primary-2',
	selectable: 'rounded-lg border text-left transition',
	'selectable-white': 'rounded-lg border text-left transition',
	symptom:
		'flex w-full flex-col items-start space-y-1 rounded-lg border border-primary-5 bg-primary-2 p-2.5 text-left text-sm text-primary-12 ring-inset transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-7/70 enabled:hover:border-primary-6',
} as const;

const buttonSizes = { sm: 'px-4 py-2', md: 'px-5 py-2.5', lg: 'px-4 py-3' } as const;
type ButtonVariant = keyof typeof buttonClasses;
type ButtonSize = keyof typeof buttonSizes;

/** Renders a button using the shared triage control variants. */
export const Button = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		variant?: ButtonVariant;
		size?: ButtonSize;
	}
>(({ className, variant = 'primary', size, type = 'button', ...props }, ref) => {
	const pressed = props['aria-pressed'] === true;
	const stateClass =
		variant === 'selectable' || variant === 'selectable-white'
			? pressed
				? 'border-primary-9 bg-primary-2 ring-1 ring-primary-9'
				: `border-primary-4 ${variant === 'selectable-white' ? 'bg-white' : ''} hover:bg-primary-2`
			: variant === 'symptom' && pressed
				? '!border-primary-9 ring-1 ring-primary-9'
				: '';
	return <button ref={ref} type={type} className={[buttonClasses[variant], stateClass, size && buttonSizes[size], className].filter(Boolean).join(' ')} {...props} />;
});
Button.displayName = 'Button';

/** Renders a styled text input for either demo form. */
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { variant?: FieldVariant }>(({ className, variant = 'gp', ...props }, ref) => (
	<input ref={ref} className={[fieldClasses[variant], className].filter(Boolean).join(' ')} {...props} />
));
Input.displayName = 'Input';

/** Renders a styled select for either demo form. */
export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement> & { variant?: FieldVariant }>(({ className, variant = 'gp', ...props }, ref) => (
	<select ref={ref} className={[fieldClasses[variant], className].filter(Boolean).join(' ')} {...props} />
));
Select.displayName = 'Select';

/** Renders the shared handover notes field. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(({ className, ...props }, ref) => (
	<textarea ref={ref} className={['min-h-24 w-full resize-y rounded-md border border-primary-5 p-3 text-sm', className].filter(Boolean).join(' ')} {...props} />
));
Textarea.displayName = 'Textarea';
