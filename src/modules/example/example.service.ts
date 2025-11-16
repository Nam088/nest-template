import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateExampleDto, UpdateExampleDto } from '@/modules/example/dto';

export interface Example {
    createdAt: Date;
    description?: string;
    id: string;
    name: string;
    price?: number;
    tags: string[];
    updatedAt: Date;
}

@Injectable()
export class ExampleService {
    private examples: Example[] = [];
    private idCounter = 1;

    /**
     * Creates a new example entity
     * @param {CreateExampleDto} createExampleDto - The data transfer object containing example creation data
     * @returns {Example} The newly created example with generated ID and timestamps
     */
    create(createExampleDto: CreateExampleDto): Example {
        const newExample: Example = {
            id: `example-${this.idCounter++}`,
            name: createExampleDto.name,
            description: createExampleDto.description,
            price: createExampleDto.price,
            tags: createExampleDto.tags || [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        this.examples.push(newExample);

        return newExample;
    }

    /**
     * Retrieves all examples with optional filtering and sorting
     * @param {Object} [query] - Optional query parameters for filtering and sorting
     * @param {string} [query.search] - Search term to filter examples by name or description
     * @param {string} [query.sortBy] - Field name to sort by (e.g., 'name', 'price', 'createdAt')
     * @param {'asc' | 'desc'} [query.sortOrder] - Sort order direction
     * @returns {Example[]} Array of examples matching the query criteria
     */
    findAll(query?: { search?: string; sortBy?: string; sortOrder?: string }): Example[] {
        let results = [...this.examples];

        // Search filter
        if (query?.search) {
            const searchLower = query.search.toLowerCase();

            results = results.filter(
                (example) =>
                    example.name.toLowerCase().includes(searchLower) ||
                    example.description?.toLowerCase().includes(searchLower),
            );
        }

        // Sort
        if (query?.sortBy) {
            results.sort((a, b) => {
                const aValue = a[query.sortBy as keyof Example];
                const bValue = b[query.sortBy as keyof Example];

                if (aValue === undefined || bValue === undefined) {
                    return 0;
                }

                let comparison = 0;

                if (aValue > bValue) {
                    comparison = 1;
                } else if (aValue < bValue) {
                    comparison = -1;
                }

                return query.sortOrder === 'desc' ? -comparison : comparison;
            });
        }

        return results;
    }

    /**
     * Retrieves a single example by its ID
     * @param {string} id - The unique identifier of the example
     * @returns {Example} The example entity matching the provided ID
     * @throws {NotFoundException} Throws if example with the given ID is not found
     */
    findOne(id: string): Example {
        const example = this.examples.find((item) => item.id === id);

        if (!example) {
            throw new NotFoundException(`Example with ID ${id} not found`);
        }

        return example;
    }

    /**
     * Updates an existing example entity
     * @param {string} id - The unique identifier of the example to update
     * @param {UpdateExampleDto} updateExampleDto - The data transfer object containing fields to update
     * @returns {Example} The updated example entity with new updatedAt timestamp
     * @throws {NotFoundException} Throws if example with the given ID is not found
     */
    update(id: string, updateExampleDto: UpdateExampleDto): Example {
        const example = this.findOne(id);

        Object.assign(example, {
            ...updateExampleDto,
            updatedAt: new Date(),
        });

        return example;
    }

    /**
     * Removes an example entity by its ID
     * @param {string} id - The unique identifier of the example to delete
     * @returns {{ message: string }} An object containing a success message
     * @throws {NotFoundException} Throws if example with the given ID is not found
     */
    remove(id: string): { message: string } {
        const example = this.findOne(id);
        const index = this.examples.indexOf(example);

        this.examples.splice(index, 1);

        return { message: `Example with ID ${id} has been deleted` };
    }
}
