import { defineConfig } from '@openapi-codegen/cli'
import {
  generateReactQueryComponents,
  generateSchemaTypes,
} from '@openapi-codegen/typescript'

export default defineConfig({
  api: {
    from: {
      relativePath: './openapi.yml',
      source: 'file',
    },
    outputDir: 'src/shared/services/api/generated',
    to: async (context) => {
      const filenamePrefix = 'api'
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      })
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      })
    },
  },
})
