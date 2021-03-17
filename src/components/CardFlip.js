import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useOverrides } from '@quarkly/components';
import { Box, Text } from '@quarkly/widgets';
const overrides = {
	'Flip wrapper': {
		'kind': 'Box',
		'props': {
			'position': 'relative',
			'width': '300px',
			'height': '450px',
			'border': '1px solid #CCC',
			'perspective': '600px',
			'overflow': 'hidden'
		}
	},
	'Flip card': {
		'kind': 'Box',
		'props': {
			'height': '100%',
			'width': '100%',
			'transform-style': 'preserve-3d',
			'cursor': 'pointer',
			'position': 'relative'
		}
	},
	'Flip card item': {
		'kind': 'Box',
		'props': {
			'position': 'absolute',
			'width': '100%',
			'height': '100%',
			'backface-visibility': 'hidden'
		}
	},
	'Flip card item :Face': {
		'kind': 'Box'
	},
	'Flip card item :Back': {
		'kind': 'Box'
	}
};
const flipStyles = {
	toRight: {
		transform: 'rotateY(180deg)'
	},
	toLeft: {
		transform: 'rotateY(-180deg)'
	},
	toUp: {
		transform: 'rotateX(180deg)'
	},
	toDown: {
		transform: 'rotateX(-180deg)'
	}
};
let currentStyles = {
	transform: 'rotateY(180deg)'
};

const FlipCard = ({
	flipTriggerProp,
	flipDirectionProp,
	flipDurationProp,
	timingFunctionProp,
	children,
	...props
}) => {
	const [isFlipped, setFlipped] = useState(false);
	const flipTrigger = useMemo(() => flipTriggerProp === 'Click', [flipTriggerProp]);
	const flipDuration = useMemo(() => flipDurationProp.replace(/\s+/g, ''), [flipDurationProp]);
	useEffect(() => {
		currentStyles = flipStyles[flipDirectionProp];
	}, [flipDirectionProp]);

	const onClickFlip = () => {
		if (flipTrigger) setFlipped(!isFlipped);
	};

	const onHoverFlip = () => {
		if (!flipTrigger) setFlipped(!isFlipped);
	};

	const {
		override,
		rest
	} = useOverrides(props, overrides);
	return <Box {...rest} {...override(`Flip wrapper`)}>
		<Box
			{...override(`Flip card`)}
			transition={`transform ${flipDuration}ms ${timingFunctionProp}`}
			onClick={onClickFlip}
			onMouseEnter={onHoverFlip}
			onMouseLeave={onHoverFlip}
			{...isFlipped ? currentStyles : ''}
		>
			<Box {...override(`Flip card item`, `Flip card item :Face`)}>
				{children}
			</Box>
			<Box {...override(`Flip card item`, `Flip card item :Back`)} {...currentStyles} {...isFlipped ? '' : currentStyles}>
				<Text>
					Бесплатный сервис Google позволяет мгновенно переводить слова, фразы и веб-страницы с английского более чем на 100 языков и обратно.
						Вы посещали эту страницу несколько раз. Дата последнего посещения: 13.03.20 
				</Text>
				 
			</Box>
		</Box>
	</Box>;
};

const propInfo = {
	flipTriggerProp: {
		title: 'Flip Trigger',
		description: {
			en: 'Способ активации анимации'
		},
		control: 'radio-group',
		variants: ['Click', 'Hover'],
		category: 'Main',
		weight: .5
	},
	flipDirectionProp: {
		title: 'Flip Direction',
		description: {
			en: 'Напрвление поворота'
		},
		control: 'select',
		variants: ['toRight', 'toLeft', 'toUp', 'toDown'],
		category: 'Main',
		weight: .5
	},
	flipDurationProp: {
		title: 'Flip Duration',
		description: {
			en: 'Продолжительность анимации'
		},
		control: 'input',
		category: 'Animation params',
		weight: .5
	},
	timingFunctionProp: {
		title: 'Timing Function',
		description: {
			en: 'Скорость течения анимации'
		},
		control: 'input',
		variants: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'step-start', 'step-end'],
		category: 'Animation params',
		weight: .5
	}
};
const defaultProps = {
	flipTriggerProp: 'Click',
	flipDirectionProp: 'toRight',
	flipDurationProp: '1000',
	timingFunctionProp: 'cubic-bezier(.50,-0.35,.50,1.65)'
};
Object.assign(FlipCard, {
	overrides,
	propInfo,
	defaultProps
});
export default FlipCard;