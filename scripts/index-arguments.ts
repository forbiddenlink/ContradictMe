import { algoliasearch } from 'algoliasearch';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const INDEX_NAME = 'contradictme_arguments';

async function configureIndex(client: ReturnType<typeof algoliasearch>) {
  console.log('📋 Configuring index settings...');

  try {
    await client.setSettings({
      indexName: INDEX_NAME,
      indexSettings: {
        searchableAttributes: [
          'mainClaim',
          'evidence',
          'supportingPoints',
          'opposingBeliefs',
          'tags',
          'domain',
        ],
        attributesForFaceting: [
          'filterOnly(position)',
          'searchable(metadata.domain)',
          'searchable(metadata.argumentType)',
          'filterOnly(sourceMetadata.yearPublished)',
          'filterOnly(qualityScore)',
        ],
        customRanking: [
          'desc(qualityScore)',
          'desc(sourceCredibility)',
          'desc(evidenceStrength)',
        ],
        attributesToSnippet: [
          'evidence:50',
          'mainClaim:30'
        ],
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>',
      },
    });

    console.log('✅ Index settings configured');
  } catch (error) {
    console.error('❌ Error configuring index:', error);
    throw error;
  }
}

async function indexArguments(client: ReturnType<typeof algoliasearch>) {
  console.log('🚀 Starting argument indexing...\n');

  // Read all JSON files from data/arguments
  const argumentsDir = path.join(process.cwd(), 'data', 'arguments');
  const files = fs.readdirSync(argumentsDir).filter(f => f.endsWith('.json'));

  console.log(`📁 Found ${files.length} argument file(s)\n`);

  const argumentsToIndex = [];

  for (const file of files) {
    const filePath = path.join(argumentsDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (!content || content.trim() === '') {
        console.log(`⚠️  Skipping empty file: ${file}\n`);
        continue;
      }
      const argument = JSON.parse(content);
      argumentsToIndex.push(argument);
      console.log(`📄 Loaded: ${file}`);
      console.log(`   Claim: ${argument.mainClaim}`);
      console.log(`   Quality: ${argument.qualityScore}/100\n`);
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
      throw error;
    }
  }

  try {
    console.log('⬆️  Indexing to Algolia...');
    const responses = await client.saveObjects({
      indexName: INDEX_NAME,
      objects: argumentsToIndex,
    });

    console.log('\n✅ Successfully indexed arguments:');
    argumentsToIndex.forEach((arg: any, idx: number) => {
      console.log(`   ${idx + 1}. ${arg.objectID}`);
    });

    console.log('\n🔍 Test your agent at: https://dashboard.algolia.com/');
    console.log(`📊 Index: ${INDEX_NAME}\n`);
  } catch (error) {
    console.error('❌ Error indexing arguments:', error);
    throw error;
  }
}

async function main() {
  // Initialize Algolia client (v5 API)
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.ALGOLIA_ADMIN_API_KEY!
  );

  try {
    await configureIndex(client);
    await indexArguments(client);
    console.log('🎉 All done!');
  } catch (error) {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }
}

main();
