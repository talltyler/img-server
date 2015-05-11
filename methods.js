module.exports = {
  toFormat: {
    name: 'Format',
    type: 'string',
    signature: 'format',
    description: 'A String containing jpeg, png, or webp. This is the format the file will be saved out as.',
    options: ['jpeg', 'png', 'webp']
  },
  resize: {
    name: 'Resize',
    type: 'numbers',
    signature: 'width,[height]',
    description: 'Scale output to width x height. By default, the resized image is cropped to the exact size specified.\n width is the integral Number of pixels wide the resultant image should be, between 1 and 16383 (0x3FFF). Use null or undefined to auto-scale the width to match the height.\nheight is the integral Number of pixels high the resultant image should be, between 1 and 16383. Use null or undefined to auto-scale the height to match the width.'
  },
  extract: {
    name: 'Extract',
    type: 'numbers',
    signature: 'top,left,width,height',
    description: 'Extract a region of the image. Can be used with or without a resize operation.\ntop and left are the offset, in pixels, from the top-left corner.\nwidth and height are the dimensions of the extracted image.\nUse extract before resize for pre-resize extraction. Use extract after resize for post-resize extraction. Use extract before and after for both.'
  },
  crop: {
    name: 'Crop',
    type: 'numbers',
    signature: '[gravity]',
    description: 'Crop the resized image to the exact size specified, the default behaviour.\ngravity, if present, is an attribute of the sharp.gravity Object e.g. sharp.gravity.north.\nThe default gravity is center(0), other values are north(1), east(2), south(3) and west(4).',
    options: [0, 1, 2, 3, 4]
  },
  max: {
    name: 'Max',
    type: 'boolean',
    signature: 'true',
    description: 'Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to the width and height specified.\nBoth width and height must be provided via resize otherwise the behaviour will default to crop.'
  },
  min: {
    name: 'Min',
    type: 'boolean',
    signature: 'true',
    description: 'Preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to the width and height specified.\nBoth width and height must be provided via resize otherwise the behaviour will default to crop.'
  },
  ignoreAspectRatio: {
    name: 'Ignore Aspect Ratio',
    type: 'boolean',
    signature: 'true',
    description: 'Ignoring the aspect ratio of the input, stretch the image to the exact width and/or height provided via resize.'
  },
  embed: {
    name: 'Embed',
    type: 'boolean',
    signature: 'true',
    description: 'Preserving aspect ratio, resize the image to the maximum width or height specified then embed on a background of the exact width and height specified.\nIf the background contains an alpha value then WebP and PNG format output images will contain an alpha channel, even when the input image does not.'
  },
  flatten: {
    name: 'Flatten',
    type: 'boolean',
    signature: 'true',
    description: 'Merge alpha transparency channel, if any, with background.'
  },
  rotate: {
    name: 'Rotate',
    type: 'numbers',
    signature: '[angle]',
    description: 'Rotate the output image by either an explicit angle or auto-orient based on the EXIF Orientation tag.\nangle, if present, is a Number with a value of 0, 90, 180 or 270.\nUse this method without angle to determine the angle from EXIF data. Mirroring is supported and may infer the use of a flip operation.\nMethod order is important when both rotating and extracting regions, for example rotate(x).extract(y) will produce a different result to extract(y).rotate(x).',
    options: [0, 90, 180, 270]
  },
  flip: {
    name: 'Flip',
    type: 'boolean',
    signature: 'true',
    description: 'Flip the image about the vertical Y axis. This always occurs after rotation, if any.'
  },
  flop: {
    name: 'Flop',
    type: 'boolean',
    signature: 'true',
    description: 'Flop the image about the horizontal X axis. This always occurs after rotation, if any.'
  },
  withoutEnlargement: {
    name: 'Without Enlargement',
    type: 'boolean',
    signature: 'true',
    description: 'Do not enlarge the output image if the input image width or height are already less than the required dimensions.\nThis is equivalent to GraphicsMagick\'s > geometry option: "change the dimensions of the image only if its width or height exceeds the geometry specification".'
  },
  blur: {
    name: 'Blur',
    type: 'numbers',
    signature: '[sigma]',
    description: 'When used without parameters, performs a fast, mild blur of the output image. This typically reduces performance by 10%.\n\nWhen a sigma is provided, performs a slower, more accurate Gaussian blur. This typically reduces performance by 25%.\n\nsigma, if present, is a Number between 0.3 and 1000 representing the approximate blur radius in pixels.'
  },
  interpolateWith: {
    name: 'Interpolate With',
    type: 'string',
    signature: 'interpolator',
    description: 'Use the given interpolator for image resizing, where interpolator is an attribute of the sharp.interpolator Object e.g. sharp.interpolator.bicubic.\n\nPossible interpolators, in order of performance, are:\n\nnearest: Use nearest neighbour interpolation, suitable for image enlargement only.\nbilinear: Use bilinear interpolation, the default and fastest image reduction interpolation.\nbicubic: Use bicubic interpolation, which typically reduces performance by 5%.\nvertexSplitQuadraticBasisSpline: Use VSQBS interpolation, which prevents "staircasing" and typically reduces performance by 5%.\nlocallyBoundedBicubic: Use LBB interpolation, which prevents some "acutance" and typically reduces performance by a factor of 2.\nnohalo: Use Nohalo interpolation, which prevents acutance and typically reduces performance by a factor of 3.',
    options: ["nearest", "bilinear", "bicubic", "locallyBoundedBicubic", "nohalo"]
  },
  gamma: {
    name: 'Gamma',
    type: 'numbers',
    signature: '[gamma]',
    description: 'Apply a gamma correction by reducing the encoding (darken) pre-resize at a factor of 1/gamma then increasing the encoding (brighten) post-resize at a factor of gamma.\n\ngamma, if present, is a Number betweem 1 and 3. The default value is 2.2, a suitable approximation for sRGB images.\n\nThis can improve the perceived brightness of a resized image in non-linear colour spaces.\n\nJPEG input images will not take advantage of the shrink-on-load performance optimisation when applying a gamma correction.\n'
  },
  grayscale: {
    name: 'Grayscale',
    type: 'boolean',
    signature: 'true',
    description: 'Convert to 8-bit greyscale; 256 shades of grey.\n\nThis is a linear operation. If the input image is in a non-linear colour space such as sRGB, use gamma() with greyscale() for the best results.\n\nThe output image will still be web-friendly sRGB and contain three (identical) channels.\n'
  },
  normalize: {
    name: 'Normalize',
    type: 'boolean',
    signature: 'true',
    description: 'Enhance output image contrast by stretching its luminance to cover the full dynamic range.'
  },
  quality: {
    name: 'Quality',
    type: 'numbers',
    signature: '80',
    description: 'The output quality to use for lossy JPEG, WebP and TIFF output formats. The default quality is 80.\n\nquality is a Number between 1 and 100.'
  },
  progressive: {
    name: 'Progressive',
    type: 'boolean',
    signature: 'true',
    description: 'Use progressive (interlace) scan for JPEG and PNG output. This typically reduces compression performance by 30% but results in an image that can be rendered sooner when decompressed.'
  }
};
