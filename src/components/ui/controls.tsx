import React from 'react';

export type UiColor = 'primary' | 'secondary' | 'gray' | 'destructive';
export type UiType = 'default' | 'outline' | 'ghost' | 'tonal' | 'saturated' | 'link' | 'underline';
export type UiSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ActionVariant = UiColor | `${UiColor}-${Exclude<UiType, 'default' | 'saturated'>}`;
export type ControlVariant = UiColor | `${UiColor}-${Extract<UiType, 'outline' | 'ghost' | 'tonal'>}`;
export type SurfaceVariant = UiColor | `${UiColor}-${Exclude<UiType, 'default' | 'link' | 'underline'>}`;

type ActionTreatment = Exclude<UiType, 'saturated'>;
type ControlTreatment = Extract<UiType, 'default' | 'outline' | 'ghost' | 'tonal'>;

export const ACTION_VARIANTS = {
	primary: {
		default: 'bg-primary-9 text-white hover:bg-primary-10 focus-visible:ring-primary-9',
		outline: 'border border-primary-6 bg-transparent text-primary-10 hover:bg-primary-2 focus-visible:ring-primary-9',
		ghost: 'border border-transparent bg-transparent text-primary-10 hover:bg-primary-2 focus-visible:ring-primary-9',
		tonal: 'border border-primary-3 bg-primary-2 text-primary-12 hover:bg-primary-3 focus-visible:ring-primary-9',
		link: 'min-h-0 border-0 bg-transparent px-0 py-0 text-primary-9 underline-offset-4 hover:underline focus-visible:ring-primary-9',
		underline: 'min-h-0 border-0 bg-transparent px-0 py-0 text-primary-9 underline focus-visible:ring-primary-9',
	},
	secondary: {
		default: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
		outline: 'border border-blue-300 bg-transparent text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-600',
		ghost: 'border border-transparent bg-transparent text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-600',
		tonal: 'border border-blue-100 bg-blue-50 text-blue-800 hover:bg-blue-100 focus-visible:ring-blue-600',
		link: 'min-h-0 border-0 bg-transparent px-0 py-0 text-blue-700 underline-offset-4 hover:underline focus-visible:ring-blue-600',
		underline: 'min-h-0 border-0 bg-transparent px-0 py-0 text-blue-700 underline focus-visible:ring-blue-600',
	},
	gray: {
		default: 'bg-gray-700 text-white hover:bg-gray-800 focus-visible:ring-gray-700',
		outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-700',
		ghost: 'border border-transparent bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-700',
		tonal: 'border border-gray-200 bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-700',
		link: 'min-h-0 border-0 bg-transparent px-0 py-0 text-gray-700 underline-offset-4 hover:underline focus-visible:ring-gray-700',
		underline: 'min-h-0 border-0 bg-transparent px-0 py-0 text-gray-700 underline focus-visible:ring-gray-700',
	},
	destructive: {
		default: 'bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-600',
		outline: 'border border-rose-300 bg-transparent text-rose-700 hover:bg-rose-50 focus-visible:ring-rose-600',
		ghost: 'border border-transparent bg-transparent text-rose-700 hover:bg-rose-50 focus-visible:ring-rose-600',
		tonal: 'border border-rose-100 bg-rose-50 text-rose-800 hover:bg-rose-100 focus-visible:ring-rose-600',
		link: 'min-h-0 border-0 bg-transparent px-0 py-0 text-rose-700 underline-offset-4 hover:underline focus-visible:ring-rose-600',
		underline: 'min-h-0 border-0 bg-transparent px-0 py-0 text-rose-700 underline focus-visible:ring-rose-600',
	},
} satisfies Record<UiColor, Record<ActionTreatment, string>>;

export const CONTROL_VARIANTS = {
	primary: {
		default: 'border-primary-6 bg-white text-primary-12 placeholder:text-primary-11/50 focus-visible:ring-primary-11',
		outline: 'border-primary-5 bg-transparent text-primary-10 placeholder:text-primary-8 focus-visible:ring-primary-9',
		ghost: 'border-transparent bg-transparent text-primary-12 placeholder:text-primary-8 focus-visible:ring-primary-9',
		tonal: 'border-primary-3 bg-primary-2 text-primary-12 placeholder:text-primary-9 focus-visible:ring-primary-9',
	},
	secondary: {
		default: 'border-blue-300 bg-white text-blue-900 placeholder:text-blue-500 focus-visible:ring-blue-600',
		outline: 'border-blue-300 bg-transparent text-blue-800 placeholder:text-blue-500 focus-visible:ring-blue-600',
		ghost: 'border-transparent bg-transparent text-blue-800 placeholder:text-blue-500 focus-visible:ring-blue-600',
		tonal: 'border-blue-100 bg-blue-50 text-blue-900 placeholder:text-blue-600 focus-visible:ring-blue-600',
	},
	gray: {
		default: 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 focus-visible:ring-gray-600',
		outline: 'border-gray-300 bg-transparent text-gray-800 placeholder:text-gray-500 focus-visible:ring-gray-600',
		ghost: 'border-transparent bg-transparent text-gray-900 placeholder:text-gray-500 focus-visible:ring-gray-600',
		tonal: 'border-gray-200 bg-gray-100 text-gray-900 placeholder:text-gray-600 focus-visible:ring-gray-600',
	},
	destructive: {
		default: 'border-rose-300 bg-white text-rose-900 placeholder:text-rose-500 focus-visible:ring-rose-600',
		outline: 'border-rose-300 bg-transparent text-rose-800 placeholder:text-rose-500 focus-visible:ring-rose-600',
		ghost: 'border-transparent bg-transparent text-rose-800 placeholder:text-rose-500 focus-visible:ring-rose-600',
		tonal: 'border-rose-100 bg-rose-50 text-rose-900 placeholder:text-rose-600 focus-visible:ring-rose-600',
	},
} satisfies Record<UiColor, Record<ControlTreatment, string>>;

const ACTION_SIZES: Record<UiSize, string> = {
	xs: 'min-h-8 gap-1 px-2.5 text-xs',
	sm: 'min-h-9 gap-1.5 px-3 text-sm',
	md: 'min-h-10 gap-2 px-4 py-2 text-sm',
	lg: 'min-h-11 gap-2 px-5 py-2.5 text-base',
	xl: 'min-h-12 gap-2.5 px-6 py-3 text-base',
};

const FIELD_SIZES: Record<UiSize, string> = {
	xs: 'h-8 px-2 text-xs',
	sm: 'h-9 px-2.5 text-sm',
	md: 'h-10 px-3 text-base',
	lg: 'h-11 px-4 text-base',
	xl: 'h-12 px-4 text-lg',
};
const TEXTAREA_SIZES: Record<UiSize, string> = {
	xs: 'px-2 py-1.5 text-xs',
	sm: 'px-2.5 py-2 text-sm',
	md: 'px-3 py-2 text-sm',
	lg: 'px-4 py-3 text-base',
	xl: 'px-4 py-3 text-lg',
};

type LegacyButtonVariant = 'outline';
type LegacyToggleVariant = 'selectable' | 'selectable-white' | 'symptom';
type LegacyFieldVariant = 'gp' | 'intake';

const LEGACY_BUTTON_VARIANTS: Record<LegacyButtonVariant, ActionVariant> = { outline: 'primary-outline' };
const LEGACY_TOGGLE_VARIANTS: Record<LegacyToggleVariant, ControlVariant> = {
	selectable: 'primary-outline',
	'selectable-white': 'primary-outline',
	symptom: 'primary-tonal',
};
const LEGACY_FIELD_VARIANTS: Record<LegacyFieldVariant, ControlVariant> = { gp: 'primary', intake: 'primary' };

const BUTTON_BASE =
	'inline-flex items-center justify-center rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';
const TOGGLE_BASE =
	'inline-flex items-center justify-center rounded-lg border text-left font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-60';
const FIELD_BASE = 'block w-full rounded-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50';
const SELECTED_TOGGLE: Record<UiColor, string> = {
	primary: 'border-primary-9 bg-primary-2 ring-1 ring-primary-9',
	secondary: 'border-blue-600 bg-blue-50 ring-1 ring-blue-600',
	gray: 'border-gray-700 bg-gray-100 ring-1 ring-gray-700',
	destructive: 'border-rose-600 bg-rose-50 ring-1 ring-rose-600',
};

function classes(...values: Array<string | false | undefined>): string {
	return values.filter(Boolean).join(' ');
}

function resolveVariant<T extends string>(variant: T, aliases: Partial<Record<T, string>>): string {
	return aliases[variant] ?? variant;
}

function actionClass(variant: ActionVariant): string {
	const [color, treatment = 'default'] = variant.split('-') as [UiColor, ActionTreatment?];
	return ACTION_VARIANTS[color][treatment];
}

function controlClass(variant: ControlVariant): string {
	const [color, treatment = 'default'] = variant.split('-') as [UiColor, ControlTreatment?];
	return CONTROL_VARIANTS[color][treatment];
}

function selectedToggleClass(variant: ControlVariant): string {
	const [color] = variant.split('-') as [UiColor];
	return SELECTED_TOGGLE[color];
}

/** Renders a button using the shared triage control variants. */
export const Button = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		variant?: ActionVariant | LegacyButtonVariant;
		size?: UiSize;
	}
>(({ className, variant = 'primary', size = 'md', type = 'button', ...props }, ref) => {
	const resolved = resolveVariant(variant, LEGACY_BUTTON_VARIANTS) as ActionVariant;
	return <button ref={ref} type={type} className={classes(BUTTON_BASE, actionClass(resolved), ACTION_SIZES[size], className)} {...props} />;
});
Button.displayName = 'Button';

/** Renders a stateful button using the shared control variants. */
export const ToggleButton = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement> & {
		variant?: ControlVariant | LegacyToggleVariant;
		size?: UiSize;
	}
>(({ className, variant = 'primary-outline', size = 'md', type = 'button', ...props }, ref) => {
	const resolved = resolveVariant(variant, LEGACY_TOGGLE_VARIANTS) as ControlVariant;
	const selected = props['aria-pressed'] === true;
	return <button ref={ref} type={type} className={classes(TOGGLE_BASE, selected ? selectedToggleClass(resolved) : controlClass(resolved), ACTION_SIZES[size], className)} {...props} />;
});
ToggleButton.displayName = 'ToggleButton';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & { variant?: ControlVariant | LegacyFieldVariant; size?: UiSize };
type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> & { variant?: ControlVariant | LegacyFieldVariant; size?: UiSize };
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { variant?: ControlVariant; size?: UiSize };

/** Renders a styled text input for either demo form. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
	const resolved = resolveVariant(variant, LEGACY_FIELD_VARIANTS) as ControlVariant;
	return <input ref={ref} className={classes(FIELD_BASE, controlClass(resolved), FIELD_SIZES[size], variant === 'intake' && 'mt-1', className)} {...props} />;
});
Input.displayName = 'Input';

/** Renders a styled select for either demo form. */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, variant = 'primary', size = 'md', ...props }, ref) => {
	const resolved = resolveVariant(variant, LEGACY_FIELD_VARIANTS) as ControlVariant;
	return <select ref={ref} className={classes(FIELD_BASE, controlClass(resolved), FIELD_SIZES[size], variant === 'intake' && 'mt-1', className)} {...props} />;
});
Select.displayName = 'Select';

/** Renders the shared handover notes field. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, variant = 'primary', size = 'md', ...props }, ref) => (
	<textarea
		ref={ref}
		className={classes(
			'min-h-24 w-full resize-y rounded-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
			controlClass(variant),
			TEXTAREA_SIZES[size],
			className,
		)}
		{...props}
	/>
));
Textarea.displayName = 'Textarea';
