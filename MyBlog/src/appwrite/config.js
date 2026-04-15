import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query, TablesDB } from "appwrite";

export class Service{
    client = new Client;
    tablesDB;
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.tablesDB = new TablesDB(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage, status , userId}){
        try {
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
                data:{
                    title: title,
                    content: content,
                    featuredImage: featuredImage,
                    status: status,
                    userId: userId,
                }
            })
        } catch (error) {
            console.log("Appwrite service :: createPost :: ",error);
            
        }
    }

    async updatePost(slug,{title,content,featuredImage, status}){
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId:slug,
                data:{
                    title: title,
                    content: content,
                    featuredImage: featuredImage,
                    status: status,
                }
            })
        } catch (error) {
            console.log("Appwrite service :: updatePost :: ",error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
            })
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: ",error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                rowId: slug,
            })
        } catch (error) {
            console.log("Appwrite service :: getPost :: ",error);
            
        }
    }
    async getPosts(queries = [Query.equal("status", true)]){
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteCollectionId,
                queries,
            })
        } catch (error) {
            console.log("Appwrite service :: getPosts :: ",error);
            return false;
        }
    }
    // file upload methods
    async uploadFile(file){
        try {
            return await this.storage.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file
            })
        } catch (error) {
            console.log("Appwrite service :: uploadFile",error);
            
        }
    }
    
    async deleteFile(fileId){
        try {
            await this.storage.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            })
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile",error);
            return false
        }
    }
    
    getFilePreview(fileId){
        return this.storage.getFilePreview({
            bucketId: conf.appwriteBucketId,
            fileId: fileId,
        })
    }
}

const service = new Service;
export default service