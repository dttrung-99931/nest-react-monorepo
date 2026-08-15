import { Type } from '@nestjs/common';
import { getSchemaPath } from '@nestjs/swagger';
import { ErrorCode } from '@panda-chat/types';

// return swagger schema for type BaseResponse<TItem>
// where TItem type of response object
export function baseResponseScheme<TItem>(itemClass: Type<TItem>) {
  return {
    type: 'object',
    properties: {
      status: {
        type: 'number',
        example: 200,
      },
      data: {
        type: 'object',
        $ref: getSchemaPath(itemClass),
      },
      error: exceptionSchema(),
    },
  };
}

// return swagger schema for type BaseResponse<Array<TItem>>
// where TItem type of response item
export function baseResponseListScheme<TItem>(itemClass: Type<TItem>) {
  return {
    type: 'object',
    properties: {
      status: {
        type: 'number',
        example: 200,
      },
      data: {
        type: 'array',
        items: {
          $ref: getSchemaPath(itemClass),
        },
      },
      error: exceptionSchema(),
    },
  };
}

function exceptionSchema() {
  return {
    type: 'object',
    properties: {
      errorCode: {
        type: 'string',
        enum: Object.values(ErrorCode),
        example: ErrorCode.BAD_REQUEST,
      },
      message: {
        description: 'Error message or validation issues',
        oneOf: [
          { type: 'string', example: 'Bad request' },
          { type: 'array', items: { type: 'object' } },
          { type: 'object' },
        ],
      },
    },
    required: ['errorCode', 'message'],
  };
}
