
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5035

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src


# Copy the project file and restore
COPY TaskManager.Backend.csproj ./
RUN dotnet restore

# Copy everything else and publish
COPY . .
RUN dotnet publish TaskManager.Backend.csproj -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "TaskManager.Backend.dll"]