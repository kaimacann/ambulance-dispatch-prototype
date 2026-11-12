/**
 * src/components/ui/controls.tsx
 */

/*//////////////////////////////////////////////////
IMPORTS
//////////////////////////////////////////////////*/

// COMPONENTS
import React from 'react';

/*//////////////////////////////////////////////////
CONFIG
//////////////////////////////////////////////////*/

/** Palette names supported by shared interface controls. */
type UiColor = 'primary' | 'secondary' | 'gray' | 'destructive';
/** Visual treatments available to shared interface controls. */
type UiType = 'default' | 'outline' | 'ghost' | 'tonal' | 'saturated' | 'underline';
/** Preset control dimensions from extra small through extra large. */
export type UiSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/** Variants available to action buttons. */
export type ActionVariant = UiColor | `${UiColor}-${Exclude<UiType, 'default' | 'saturated'>}`;
/** Variants available to form and toggle controls. */
type ControlVariant = UiColor | `${UiColor}-${Extract<UiType, 'outline' | 'ghost' | 'tonal'>}`;
/** Variants available to semantic surface containers. */
export type SurfaceVariant = UiColor | `${UiColor}-${Exclude<UiType, 'default' | 'underline'>}`;
/** Treatments usable by action buttons. */
type ActionTreatment = Exclude<UiType, 'saturated'>;
/** Treatments usable by form and toggle controls. */
type ControlTreatment = Extract<UiType, 'default' | 'outline' | 'ghost' | 'tonal'>;
/** Treatments usable by surface containers. */
type SurfaceTreatment = Exclude<UiType, 'underline'>;
const ACTION_VARIANTS = {
	primary: {
		default: 'bg-primary-9 text-white hover:bg-primary-10 focus-visible:ring-primary-9',
		outline: 'border border-primary-6 bg-transparent text-primary-10 hover:bg-primary-2 focus-visible:ring-primary-9',
		ghost: 'border border-transparent bg-transparent text-primary-10 hover:bg-primary-2 focus-visible:ring-primary-9',
		tonal: 'border border-primary-3 bg-primary-2 text-primary-12 hover:bg-primary-3 focus-visible:ring-primary-9',
		underline: 'min-h-0 border-0 bg-transparent px-0 py-0 text-primary-9 underline focus-visible:ring-primary-9',
	},
	secondary: {
		default: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600',
		outline: 'border border-blue-300 bg-transparent text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-600',
		ghost: 'border border-transparent bg-transparent text-blue-700 hover:bg-blue-50 focus-visible:ring-blue-600',
		tonal: 'border border-blue-100 bg-blue-50 text-blue-800 hover:bg-blue-100 focus-visible:ring-blue-600',
		underline: 'min-h-0 border-0 bg-transparent px-0 py-0 text-blue-700 underline focus-visible:ring-blue-600',
	},
	gray: {
		default: 'bg-gray-700 text-white hover:bg-gray-800 focus-visible:ring-gray-700',
		outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-700',
		ghost: 'border border-transparent bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-700',
		tonal: 'border border-gray-200 bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-700',
		underline: 'min-h-0 border-0 bg-transparent px-0 py-0 text-gray-700 underline focus-visible:ring-gray-700',
	},
	destructive: {
		default: 'bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-600',
		outline: 'border border-rose-300 bg-transparent text-rose-700 hover:bg-rose-50 focus-visible:ring-rose-600',
		ghost: 'border border-transparent bg-transparent text-rose-700 hover:bg-rose-50 focus-visible:ring-rose-600',
		tonal: 'border border-rose-100 bg-rose-50 text-rose-800 hover:bg-rose-100 focus-visible:ring-rose-600',
		underline: 'min-h-0 border-0 bg-transparent px-0 py-0 text-rose-700 underline focus-visible:ring-rose-600',
	},
} satisfies Record<UiColor, Record<ActionTreatment, string>>;
const CONTROL_VARIANTS = {
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
const SURFACE_VARIANTS = {
	primary: {
		default: 'border-primary-5 bg-white text-primary-12',
		outline: 'border-primary-5 bg-transparent text-primary-12',
		ghost: 'border-transparent bg-transparent text-primary-12',
		tonal: 'border-primary-3 bg-primary-2 text-primary-12',
		saturated: 'border-primary-9 bg-primary-9 text-white',
	},
	secondary: {
		default: 'border-blue-300 bg-white text-blue-900',
		outline: 'border-blue-300 bg-transparent text-blue-800',
		ghost: 'border-transparent bg-transparent text-blue-800',
		tonal: 'border-blue-200 bg-blue-50 text-blue-900',
		saturated: 'border-blue-600 bg-blue-600 text-white',
	},
	gray: {
		default: 'border-gray-300 bg-white text-gray-900',
		outline: 'border-gray-300 bg-transparent text-gray-800',
		ghost: 'border-transparent bg-transparent text-gray-800',
		tonal: 'border-gray-200 bg-gray-100 text-gray-900',
		saturated: 'border-gray-700 bg-gray-700 text-white',
	},
	destructive: {
		default: 'border-rose-300 bg-white text-rose-900',
		outline: 'border-rose-300 bg-transparent text-rose-800',
		ghost: 'border-transparent bg-transparent text-rose-800',
		tonal: 'border-rose-200 bg-rose-50 text-rose-900',
		saturated: 'border-rose-600 bg-rose-600 text-white',
	},
} satisfies Record<UiColor, Record<SurfaceTreatment, string>>;
export const ACTION_SIZES: Record<UiSize, string> = {
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
const FIELD_BASE = 'block w-full rounded-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50';
const SELECTED_TOGGLE: Record<UiColor, string> = {
	primary: 'border-primary-9 bg-primary-2 ring-1 ring-primary-9',
	secondary: 'border-blue-600 bg-blue-50 ring-1 ring-blue-600',
	gray: 'border-gray-700 bg-gray-100 ring-1 ring-gray-700',
	destructive: 'border-rose-600 bg-rose-50 ring-1 ring-rose-600',
};

/** Renders a button using the shared triage control variants. */
export const Button = React.forwardRef(renderButton);
/** Renders a stateful button using the shared control variants. */
export const ToggleButton = React.forwardRef(renderToggleButton);
/** Renders a styled text input with shared palette and size variants. */
export const Input = React.forwardRef(renderInput);
/** Renders a styled select with shared palette and size variants. */
export const Select = React.forwardRef(renderSelect);
/** Renders a handover notes field with shared palette and size variants. */
export const Textarea = React.forwardRef(renderTextarea);

/*//////////////////////////////////////////////////
HELPERS
//////////////////////////////////////////////////*/

/**
 * Renders a triage button from native attributes and the selected shared variant.
 *
 * @param attributes Native button attributes with shared color and size options.
 * @param ref Ref forwarded to the rendered button element.
 *
 * @return Styled button element.
 */
function renderButton(
	attributes: React.ButtonHTMLAttributes<HTMLButtonElement> & {
		variant?: ActionVariant;
		size?: UiSize;
	},
	ref: React.ForwardedRef<HTMLButtonElement>,
): React.JSX.Element {
	const { className, variant = 'primary', size = 'md', type = 'button', ...attrs } = attributes;
	return (
		<button
			ref={ref}
			type={type}
			className={classes(
				'inline-flex items-center justify-center rounded-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
				actionClass(variant),
				ACTION_SIZES[size],
				className,
			)}
			{...attrs}
		/>
	);
}

/**
 * Renders a triage toggle using `aria-pressed` to select its state treatment.
 *
 * @param attributes Native button attributes with shared color and size options.
 * @param ref Ref forwarded to the rendered toggle element.
 *
 * @return Styled toggle button element.
 */
function renderToggleButton(
	attributes: React.ButtonHTMLAttributes<HTMLButtonElement> & {
		variant?: ControlVariant;
		size?: UiSize;
	},
	ref: React.ForwardedRef<HTMLButtonElement>,
): React.JSX.Element {
	const { className, variant = 'primary-outline', size = 'md', type = 'button', ...attrs } = attributes;
	return (
		<button
			ref={ref}
			type={type}
			className={classes(
				'inline-flex items-center justify-center rounded-lg border text-left font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-60',
				attrs['aria-pressed'] === true ? selectedToggleClass(variant) : controlClass(variant),
				{
					xs: 'min-h-8 px-2 py-1 text-xs',
					sm: 'min-h-9 px-2.5 py-1.5 text-sm',
					md: 'min-h-10 px-3 py-2 text-sm',
					lg: 'min-h-11 px-4 py-2.5 text-base',
					xl: 'min-h-12 px-5 py-3 text-base',
				}[size],
				className,
			)}
			{...attrs}
		/>
	);
}

/**
 * Renders a styled text input and forwards the underlying input ref.
 *
 * @param attributes Native input attributes with shared color and size options.
 * @param ref Ref forwarded to the rendered input element.
 *
 * @return Styled input element.
 */
function renderInput(
	attributes: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
		variant?: ControlVariant;
		size?: UiSize;
	},
	ref: React.ForwardedRef<HTMLInputElement>,
): React.JSX.Element {
	const { className, variant = 'primary', size = 'md', ...attrs } = attributes;
	return <input ref={ref} className={classes(FIELD_BASE, controlClass(variant), FIELD_SIZES[size], className)} {...attrs} />;
}

/**
 * Renders a styled select and forwards the underlying select ref.
 *
 * @param attributes Native select attributes with shared color and size options.
 * @param ref Ref forwarded to the rendered select element.
 *
 * @return Styled select element.
 */
function renderSelect(
	attributes: Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
		variant?: ControlVariant;
		size?: UiSize;
	},
	ref: React.ForwardedRef<HTMLSelectElement>,
): React.JSX.Element {
	const { className, variant = 'primary', size = 'md', ...attrs } = attributes;
	return <select ref={ref} className={classes(FIELD_BASE, controlClass(variant), FIELD_SIZES[size], className)} {...attrs} />;
}

/**
 * Renders a styled multiline handover field with shared sizing and palette rules.
 *
 * @param attributes Native textarea attributes with shared color and size options.
 * @param ref Ref forwarded to the rendered textarea element.
 *
 * @return Styled textarea element.
 */
function renderTextarea(
	attributes: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
		variant?: ControlVariant;
		size?: UiSize;
	},
	ref: React.ForwardedRef<HTMLTextAreaElement>,
): React.JSX.Element {
	const { className, variant = 'primary', size = 'md', ...attrs } = attributes;
	return (
		<textarea
			ref={ref}
			className={classes(
				'min-h-24 w-full resize-y rounded-md border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
				controlClass(variant),
				{
					xs: 'px-2 py-1.5 text-xs',
					sm: 'px-2.5 py-2 text-sm',
					md: 'px-3 py-2 text-sm',
					lg: 'px-4 py-3 text-base',
					xl: 'px-4 py-3 text-lg',
				}[size],
				className,
			)}
			{...attrs}
		/>
	);
}

/**
 * Joins enabled class names into one CSS class string.
 *
 * @param values - Class names and conditional values to combine.
 *
 * @return The non-empty class names separated by spaces.
 */
function classes(...values: Array<string | false | undefined>): string {
	return values.filter(Boolean).join(' ');
}

/**
 * Renders a semantic container using the shared surface variants.
 *
 * @param asElement - Semantic element used to render the surface.
 * @param variant - Surface palette and treatment.
 * @param className - Additional class names applied to the surface.
 * @param attrs - Remaining HTML attributes forwarded to the surface element.
 *
 * @return The semantic container element with its variant styles applied.
 */
export function Surface({
	as: asElement = 'div',
	variant = 'primary',
	className,
	...attrs
}: React.HTMLAttributes<HTMLElement> & {
	as?: 'div' | 'section' | 'article' | 'header' | 'span';
	variant?: SurfaceVariant;
}): React.JSX.Element {
	const Element = asElement;
	return <Element className={classes(surfaceClass(variant), className)} {...attrs} />;
}

/**
 * Resolves the class names for an action button variant.
 *
 * @param variant - Palette and treatment combination to resolve.
 *
 * @return CSS classes assigned to the requested action variant.
 */
export function actionClass(variant: ActionVariant): string {
	const [color, treatment = 'default'] = variant.split('-') as [UiColor, ActionTreatment?];
	return ACTION_VARIANTS[color][treatment];
}

/**
 * Resolves the class names for a surface variant.
 *
 * @param variant - Palette and treatment combination to resolve.
 *
 * @return CSS classes assigned to the requested surface variant.
 */
function surfaceClass(variant: SurfaceVariant): string {
	const [color, treatment = 'default'] = variant.split('-') as [UiColor, SurfaceTreatment?];
	return SURFACE_VARIANTS[color][treatment];
}

/**
 * Resolves the class names for a form control variant.
 *
 * @param variant - Palette and treatment combination to resolve.
 *
 * @return CSS classes assigned to the requested form control variant.
 */
function controlClass(variant: ControlVariant): string {
	const [color, treatment = 'default'] = variant.split('-') as [UiColor, ControlTreatment?];
	return CONTROL_VARIANTS[color][treatment];
}

/**
 * Resolves the selected-state class names for a toggle palette.
 *
 * @param variant - Control palette and treatment for the toggle.
 *
 * @return CSS classes applied while the toggle is selected.
 */
function selectedToggleClass(variant: ControlVariant): string {
	const [color] = variant.split('-') as [UiColor];
	return SELECTED_TOGGLE[color];
}
Button.displayName = 'Button';
ToggleButton.displayName = 'ToggleButton';
Input.displayName = 'Input';
Select.displayName = 'Select';
Textarea.displayName = 'Textarea';
