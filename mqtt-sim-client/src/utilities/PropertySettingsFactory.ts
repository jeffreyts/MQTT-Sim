export class PropertySettingsFactory {
    public static createPropertySettings(type: string): Map<string, any> {
        switch (type) {
            case 'stringCategory':
                return new Map<string, any>([
                    ['categories', 'first,second,third'],
                    ['probabilityOfChange%', 30]
                ]);
            case 'numberRandom':
                return new Map<string, any>([
                    ['type', 'number'],
                    ['min',  0],
                    ['max', 100],
                    ['precision', 2]
                ]);
            case 'numberNormal':
                return new Map<string, any>([
                    ['type', 'number'],
                    ['precision', 0],
                    ['mean', 50],
                    ['stdDev', 10]
                ]);
            case 'boolean':
                return new Map<string, any>([
                    ['probabilityOfChange%', 30]
                ]);
            case 'timestamp':
                return new Map<string, any>([
                    ['format', "yyyy-MM-dd'T'HH:mm:ss.SSS"]
                ]);
            default:
                return new Map<string, any>();
        }
    }

    public static getPropertyTypes(): Map<string, string> {
        return new Map<string, string>([
            ['stringCategory', 'String: Category'],
            ['numberRandom', 'Number: Random'],
            ['numberNormal', 'Number: Normal Dist'],
            ['boolean', 'Boolean'],
            ['timestamp', 'Timestamp']
        ]);
    }
}